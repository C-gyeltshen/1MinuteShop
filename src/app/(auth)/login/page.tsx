"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  Lock,
  AlertCircle,
  CheckCircle,
  LogIn,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/app/(auth)/components/Navbar";
import Footer from "@/app/(auth)/components/Footer";
import { login } from "@/app/shared/services/authServices";

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginErrors {
  [key: string]: string;
}

export default function Login() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};
    if (!loginData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email))
      newErrors.email = "Please enter a valid email address";
    if (!loginData.password) newErrors.password = "Password is required";
    else if (loginData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setAttemptCount((prev) => prev + 1);
    try {
      const formData = new FormData();
      formData.append("email", loginData.email);
      formData.append("password", loginData.password);
      const result = await login(formData);
      if (result?.error) {
        setErrors({ general: result.error });
      } else {
        setShowSuccess(true);
        setLoginData({ email: "", password: "", rememberMe: false });
      }
    } catch {
      setErrors({ general: "An unexpected error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#080808] text-[#f0ede8] overflow-x-hidden"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[rgba(224,115,40,0.05)] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-[rgba(224,115,40,0.03)] blur-[100px]" />
        {/* Dot grid overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots-login" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.8)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-login)" />
        </svg>
      </div>

      <Navbar />

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 pt-[68px]">
        <div className="w-full max-w-[440px] py-12">

          {/* Header text above card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-[rgba(224,115,40,0.12)] border border-[rgba(224,115,40,0.25)] rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E07328] animate-pulse" />
              <span className="text-[11px] font-bold text-[#E07328] uppercase tracking-widest">
                Seller Portal
              </span>
            </div>
            <h1 className="text-[32px] sm:text-[38px] font-bold tracking-tight text-[#f0ede8] leading-tight">
              Welcome back
            </h1>
            <p className="mt-2 text-[14px] text-[rgba(240,237,232,0.45)] leading-relaxed">
              Sign in to manage your store and orders
            </p>
          </motion.div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="bg-[rgba(255,255,255,0.03)] backdrop-blur-[24px] border border-[rgba(255,255,255,0.07)] rounded-[20px] p-7 sm:p-9 shadow-[0_24px_80px_rgba(0,0,0,0.5)] hover:border-[rgba(224,115,40,0.2)] transition-colors duration-500"
          >
            {/* Success */}
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex items-center gap-3 p-4 bg-[rgba(39,201,63,0.08)] border border-[rgba(39,201,63,0.2)] rounded-[12px]"
              >
                <CheckCircle className="w-4 h-4 text-[#27c93f] shrink-0" />
                <span className="text-[13px] font-medium text-[#27c93f]">
                  Login successful — redirecting…
                </span>
              </motion.div>
            )}

            {/* General Error */}
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex items-center gap-3 p-4 bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] rounded-[12px]"
              >
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span className="text-[13px] text-red-300">{errors.general}</span>
              </motion.div>
            )}

            {/* Attempt warning */}
            {attemptCount >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex items-center gap-3 p-4 bg-[rgba(251,191,36,0.07)] border border-[rgba(251,191,36,0.18)] rounded-[12px]"
              >
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-[13px] text-amber-300">
                  Multiple failed attempts detected. Please wait before retrying.
                </span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-[12px] font-semibold text-[rgba(240,237,232,0.5)] uppercase tracking-[0.08em] mb-2.5"
                >
                  Email address <span className="text-[#E07328] normal-case tracking-normal">*</span>
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleInputChange}
                    required
                    autoComplete="email"
                    placeholder="you@store.com"
                    className={`w-full bg-[rgba(255,255,255,0.04)] border rounded-[10px] px-4 py-3.5 pl-11 text-[14px] text-[#f0ede8] placeholder-[rgba(240,237,232,0.25)] outline-none transition-all duration-200 focus:bg-[rgba(255,255,255,0.06)] ${
                      errors.email
                        ? "border-red-500/40 focus:border-red-500/70 focus:ring-1 focus:ring-red-500/30"
                        : "border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.14)] focus:border-[rgba(224,115,40,0.5)] focus:ring-1 focus:ring-[rgba(224,115,40,0.2)]"
                    }`}
                  />
                  <Mail
                    className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                      errors.email
                        ? "text-red-400"
                        : "text-[rgba(240,237,232,0.3)] group-focus-within:text-[#E07328]"
                    }`}
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mt-1.5 text-[12px] text-red-400 flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-red-400 shrink-0" />
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label
                    htmlFor="password"
                    className="text-[12px] font-semibold text-[rgba(240,237,232,0.5)] uppercase tracking-[0.08em]"
                  >
                    Password <span className="text-[#E07328] normal-case tracking-normal">*</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[12px] text-[rgba(224,115,40,0.7)] hover:text-[#E07328] transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className={`w-full bg-[rgba(255,255,255,0.04)] border rounded-[10px] px-4 py-3.5 pl-11 pr-11 text-[14px] text-[#f0ede8] placeholder-[rgba(240,237,232,0.25)] outline-none transition-all duration-200 focus:bg-[rgba(255,255,255,0.06)] ${
                      errors.password
                        ? "border-red-500/40 focus:border-red-500/70 focus:ring-1 focus:ring-red-500/30"
                        : "border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.14)] focus:border-[rgba(224,115,40,0.5)] focus:ring-1 focus:ring-[rgba(224,115,40,0.2)]"
                    }`}
                  />
                  <Lock
                    className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                      errors.password
                        ? "text-red-400"
                        : "text-[rgba(240,237,232,0.3)] group-focus-within:text-[#E07328]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[rgba(240,237,232,0.3)] hover:text-[rgba(240,237,232,0.7)] transition-colors p-0.5"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mt-1.5 text-[12px] text-red-400 flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-red-400 shrink-0" />
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2.5 pt-0.5">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={loginData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] accent-[#E07328] cursor-pointer"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-[13px] text-[rgba(240,237,232,0.45)] cursor-pointer select-none"
                >
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting || showSuccess || attemptCount >= 5}
                whileHover={{ scale: isSubmitting ? 1 : 1.015 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.985 }}
                className="w-full mt-2 flex items-center justify-center gap-2.5 py-3.5 rounded-[10px] text-[14px] font-semibold text-white bg-[#E07328] shadow-[0_0_24px_rgba(224,115,40,0.35)] hover:bg-[#f07d30] hover:shadow-[0_0_36px_rgba(224,115,40,0.5)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-200"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in…</span>
                  </>
                ) : showSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Signed in!</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Sign in to your store</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider + Register link */}
            <div className="mt-7 pt-6 border-t border-[rgba(255,255,255,0.07)] text-center">
              <p className="text-[13px] text-[rgba(240,237,232,0.4)]">
                Don't have a store yet?{" "}
                <Link
                  href="/register"
                  className="text-[#E07328] hover:text-[#f07d30] font-semibold transition-colors"
                >
                  Create one free →
                </Link>
              </p>
            </div>
          </motion.div>

          {/* Trust note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-5 text-center text-[11px] text-[rgba(240,237,232,0.25)]"
          >
            Your data is encrypted and never sold.
          </motion.p>
        </div>
      </div>

      <Footer />
    </div>
  );
}