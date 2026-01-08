"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LogIn,
  Mail,
  Lock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

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
    const newValue = type === "checkbox" ? checked : value;

    setLoginData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};

    if (!loginData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!loginData.password) {
      newErrors.password = "Password is required";
    } else if (loginData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setAttemptCount((prev) => prev + 1);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Login submitted:", loginData);

      // Show success state
      setShowSuccess(true);

      // Simulate redirect after success
      setTimeout(() => {
        alert("Login successful! Redirecting to dashboard...");
      }, 1500);

      // Reset form
      setLoginData({
        email: "",
        password: "",
        rememberMe: false,
      });
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ general: "Invalid credentials. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <Navbar />

      <div className="flex items-center pt-24 justify-center px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-700/50 p-8 lg:p-10 hover:border-[#ff6800]/50 transition-all duration-300"
          >
            <div className="text-center mb-8">
              
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
                Welcome Back
              </h2>
              <p className="text-slate-400">
                Sign in to access your dashboard and continue your journey
              </p>
            </div>

            {/* Success Message */}
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center space-x-3"
              >
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-300 font-medium">
                  Login successful! Redirecting...
                </span>
              </motion.div>
            )}

            {/* General Error Message */}
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center space-x-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-300">{errors.general}</span>
              </motion.div>
            )}

            {/* Rate Limiting Warning */}
            {attemptCount >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center space-x-3"
              >
                <AlertCircle className="w-5 h-5 text-amber-400" />
                <span className="text-amber-300">
                  Multiple failed attempts detected. Please wait before trying
                  again.
                </span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-300 mb-3"
                >
                  Email Address <span className="text-[#ff6800]">*</span>
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
                    className={`w-full px-4 py-4 pl-12 border-2 rounded-2xl focus:ring-2 focus:ring-[#ff6800] focus:border-[#ff6800] transition-all duration-200 bg-slate-700/50 hover:bg-slate-700 text-white placeholder-slate-400 ${
                      errors.email
                        ? "border-red-500/50 bg-red-500/10 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-600 hover:border-slate-500"
                    }`}
                    placeholder="john@company.com"
                  />
                  <Mail
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                      errors.email
                        ? "text-red-400"
                        : "text-slate-400 group-hover:text-[#ff6800]"
                    }`}
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mt-2 text-sm text-red-400 flex items-center"
                  >
                    <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-slate-300 mb-3"
                >
                  Password <span className="text-[#ff6800]">*</span>
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                    required
                    autoComplete="current-password"
                    className={`w-full px-4 py-4 pl-12 pr-12 border-2 rounded-2xl focus:ring-2 focus:ring-[#ff6800] focus:border-[#ff6800] transition-all duration-200 bg-slate-700/50 hover:bg-slate-700 text-white placeholder-slate-400 ${
                      errors.password
                        ? "border-red-500/50 bg-red-500/10 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-600 hover:border-slate-500"
                    }`}
                    placeholder="Enter your password"
                  />
                  <Lock
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                      errors.password
                        ? "text-red-400"
                        : "text-slate-400 group-hover:text-[#ff6800]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-[#ff6800] transition-colors p-1 rounded-lg hover:bg-slate-700"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mt-2 text-sm text-red-400 flex items-center"
                  >
                    <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={loginData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#ff6800] focus:ring-[#ff6800] border-slate-600 bg-slate-700 rounded transition-all"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-3 block text-sm font-medium text-slate-300 cursor-pointer"
                  >
                    Remember me for 30 days
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#ff6800] hover:text-[#ff9d4d] font-medium transition-colors hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || showSuccess || attemptCount >= 5}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full bg-gradient-to-r from-[#ff6800] to-[#ff9d4d] text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-[#ff6800]/30 hover:shadow-xl hover:shadow-[#ff6800]/40 transform transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : showSuccess ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Success!</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>

              {/* Sign Up Link */}
              <div className="text-center pt-6 border-t border-slate-600">
                <p className="text-slate-400">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="text-[#ff6800] hover:text-[#ff9d4d] font-semibold transition-colors hover:underline"
                  >
                    Create one now
                  </Link>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
