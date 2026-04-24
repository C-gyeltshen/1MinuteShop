"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Store,
  AlertCircle,
  CheckCircle,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/app/(auth)/components/Navbar";
import Footer from "@/app/(auth)/components/Footer";
import { signup } from "../../shared/services/authServices";

interface RegisterData {
  ownerName: string;
  storeName: string;
  email: string;
  password: string;
  confirmPassword: string;
  status: string;
}

interface RegisterErrors {
  [key: string]: string;
}

interface PasswordStrength {
  score: number;
  feedback: string[];
  color: string;
}

export default function Register() {
  const [registerData, setRegisterData] = useState<RegisterData>({
    ownerName: "",
    storeName: "",
    email: "",
    password: "",
    confirmPassword: "",
    status: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    feedback: [],
    color: "bg-[rgba(255,255,255,0.08)]",
  });

  const calculatePasswordStrength = (password: string): PasswordStrength => {
    let score = 0;
    const feedback: string[] = [];
    if (password.length >= 8) score += 25; else feedback.push("At least 8 characters");
    if (/[A-Z]/.test(password)) score += 25; else feedback.push("One uppercase letter");
    if (/[a-z]/.test(password)) score += 25; else feedback.push("One lowercase letter");
    if (/[0-9]/.test(password)) score += 12.5; else feedback.push("One number");
    if (/[^A-Za-z0-9]/.test(password)) score += 12.5; else feedback.push("One special character");

    let color = "bg-red-500";
    if (score >= 75) color = "bg-[#27c93f]";
    else if (score >= 50) color = "bg-amber-400";
    else if (score >= 25) color = "bg-orange-500";

    return { score, feedback, color };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setRegisterData((prev) => ({ ...prev, [name]: newValue }));
    if (name === "password") setPasswordStrength(calculatePasswordStrength(value));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: RegisterErrors = {};
    if (!registerData.ownerName.trim()) newErrors.ownerName = "Full name is required";
    else if (registerData.ownerName.trim().length < 2) newErrors.ownerName = "At least 2 characters";
    else if (!/^[a-zA-Z\s]+$/.test(registerData.ownerName.trim())) newErrors.ownerName = "Letters and spaces only";

    if (!registerData.storeName.trim()) newErrors.storeName = "Shop name is required";
    else if (registerData.storeName.trim().length < 2) newErrors.storeName = "At least 2 characters";
    else if (registerData.storeName.trim().length > 50) newErrors.storeName = "Max 50 characters";
    else if (!/^[a-zA-Z0-9\s\-'&.]+$/.test(registerData.storeName.trim())) newErrors.storeName = "Invalid characters in shop name";

    if (!registerData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)) newErrors.email = "Please enter a valid email address";

    if (!registerData.password) newErrors.password = "Password is required";
    else if (passwordStrength.score < 50) newErrors.password = "Password is too weak — add more variety";

    if (!registerData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (registerData.password !== registerData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("email", registerData.email);
      formData.append("password", registerData.password);
      formData.append("ownerName", registerData.ownerName);
      formData.append("storeName", registerData.storeName);
      formData.append("status", "active");
      await signup(formData);
      setShowSuccess(true);
      setRegisterData({ ownerName: "", storeName: "", email: "", password: "", confirmPassword: "", status: "" });
      setPasswordStrength({ score: 0, feedback: [], color: "bg-[rgba(255,255,255,0.08)]" });
    } catch {
      setErrors({ general: "Registration failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const storeSlug = registerData.storeName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return (
    <div
      className="min-h-screen bg-[#080808] text-[#f0ede8] overflow-x-hidden"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[rgba(224,115,40,0.05)] blur-[140px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[350px] h-[250px] rounded-full bg-[rgba(224,115,40,0.04)] blur-[100px]" />
        {/* Dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots-register" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.8)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-register)" />
        </svg>
      </div>

      <Navbar />

      <div className="relative z-10 flex min-h-screen items-start justify-center px-4 sm:px-6 pt-[68px]">
        <div className="w-full max-w-[480px] py-10 sm:py-14">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-[rgba(224,115,40,0.12)] border border-[rgba(224,115,40,0.25)] rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E07328] animate-pulse" />
              <span className="text-[11px] font-bold text-[#E07328] uppercase tracking-widest">
                Free for 30 days
              </span>
            </div>
            <h1 className="text-[32px] sm:text-[38px] font-bold tracking-tight text-[#f0ede8] leading-tight">
              Launch your store
            </h1>
            <p className="mt-2 text-[14px] text-[rgba(240,237,232,0.45)] leading-relaxed">
              Set up in under a minute — no credit card required
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
                  Store created! Check your email to get started.
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

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row: Full Name + Shop Name on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="ownerName"
                    className="block text-[12px] font-semibold text-[rgba(240,237,232,0.5)] uppercase tracking-[0.08em] mb-2.5"
                  >
                    Full name <span className="text-[#E07328] normal-case tracking-normal">*</span>
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      id="ownerName"
                      name="ownerName"
                      value={registerData.ownerName}
                      onChange={handleInputChange}
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className={`w-full bg-[rgba(255,255,255,0.04)] border rounded-[10px] px-4 py-3.5 pl-10 text-[14px] text-[#f0ede8] placeholder-[rgba(240,237,232,0.22)] outline-none transition-all duration-200 focus:bg-[rgba(255,255,255,0.06)] ${
                        errors.ownerName
                          ? "border-red-500/40 focus:border-red-500/70 focus:ring-1 focus:ring-red-500/30"
                          : "border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.14)] focus:border-[rgba(224,115,40,0.5)] focus:ring-1 focus:ring-[rgba(224,115,40,0.2)]"
                      }`}
                    />
                    <User
                      className={`absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] transition-colors duration-200 ${
                        errors.ownerName ? "text-red-400" : "text-[rgba(240,237,232,0.28)] group-focus-within:text-[#E07328]"
                      }`}
                    />
                  </div>
                  {errors.ownerName && (
                    <motion.p
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mt-1.5 text-[11px] text-red-400 flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-red-400 shrink-0" />
                      {errors.ownerName}
                    </motion.p>
                  )}
                </div>

                {/* Shop Name */}
                <div>
                  <label
                    htmlFor="storeName"
                    className="block text-[12px] font-semibold text-[rgba(240,237,232,0.5)] uppercase tracking-[0.08em] mb-2.5"
                  >
                    Shop name <span className="text-[#E07328] normal-case tracking-normal">*</span>
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      id="storeName"
                      name="storeName"
                      value={registerData.storeName}
                      onChange={handleInputChange}
                      required
                      autoComplete="organization"
                      placeholder="My Shop"
                      className={`w-full bg-[rgba(255,255,255,0.04)] border rounded-[10px] px-4 py-3.5 pl-10 text-[14px] text-[#f0ede8] placeholder-[rgba(240,237,232,0.22)] outline-none transition-all duration-200 focus:bg-[rgba(255,255,255,0.06)] ${
                        errors.storeName
                          ? "border-red-500/40 focus:border-red-500/70 focus:ring-1 focus:ring-red-500/30"
                          : "border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.14)] focus:border-[rgba(224,115,40,0.5)] focus:ring-1 focus:ring-[rgba(224,115,40,0.2)]"
                      }`}
                    />
                    <Store
                      className={`absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] transition-colors duration-200 ${
                        errors.storeName ? "text-red-400" : "text-[rgba(240,237,232,0.28)] group-focus-within:text-[#E07328]"
                      }`}
                    />
                  </div>
                  {errors.storeName && (
                    <motion.p
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mt-1.5 text-[11px] text-red-400 flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-red-400 shrink-0" />
                      {errors.storeName}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Store URL preview */}
              {storeSlug && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="flex items-center gap-2.5 bg-[rgba(224,115,40,0.07)] border border-[rgba(224,115,40,0.18)] rounded-[9px] px-3.5 py-2.5"
                >
                  <div className="w-2 h-2 rounded-full bg-[#27c93f] shrink-0" />
                  <p className="text-[12px] text-[rgba(240,237,232,0.5)] font-mono truncate">
                    <span className="text-[#E07328]">{storeSlug}</span>.1minuteshop.com
                  </p>
                </motion.div>
              )}

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
                    value={registerData.email}
                    onChange={handleInputChange}
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={`w-full bg-[rgba(255,255,255,0.04)] border rounded-[10px] px-4 py-3.5 pl-11 text-[14px] text-[#f0ede8] placeholder-[rgba(240,237,232,0.22)] outline-none transition-all duration-200 focus:bg-[rgba(255,255,255,0.06)] ${
                      errors.email
                        ? "border-red-500/40 focus:border-red-500/70 focus:ring-1 focus:ring-red-500/30"
                        : "border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.14)] focus:border-[rgba(224,115,40,0.5)] focus:ring-1 focus:ring-[rgba(224,115,40,0.2)]"
                    }`}
                  />
                  <Mail
                    className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                      errors.email ? "text-red-400" : "text-[rgba(240,237,232,0.3)] group-focus-within:text-[#E07328]"
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
                <label
                  htmlFor="password"
                  className="block text-[12px] font-semibold text-[rgba(240,237,232,0.5)] uppercase tracking-[0.08em] mb-2.5"
                >
                  Password <span className="text-[#E07328] normal-case tracking-normal">*</span>
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleInputChange}
                    required
                    autoComplete="new-password"
                    placeholder="Create a strong password"
                    className={`w-full bg-[rgba(255,255,255,0.04)] border rounded-[10px] px-4 py-3.5 pl-11 pr-11 text-[14px] text-[#f0ede8] placeholder-[rgba(240,237,232,0.22)] outline-none transition-all duration-200 focus:bg-[rgba(255,255,255,0.06)] ${
                      errors.password
                        ? "border-red-500/40 focus:border-red-500/70 focus:ring-1 focus:ring-red-500/30"
                        : "border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.14)] focus:border-[rgba(224,115,40,0.5)] focus:ring-1 focus:ring-[rgba(224,115,40,0.2)]"
                    }`}
                  />
                  <Lock
                    className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                      errors.password ? "text-red-400" : "text-[rgba(240,237,232,0.3)] group-focus-within:text-[#E07328]"
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

                {/* Strength bar */}
                {registerData.password && (
                  <div className="mt-2.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] text-[rgba(240,237,232,0.35)] uppercase tracking-[0.06em]">Strength</span>
                      <span className="text-[11px] font-semibold text-[rgba(240,237,232,0.5)]">
                        {passwordStrength.score < 25 ? "Weak" : passwordStrength.score < 50 ? "Fair" : passwordStrength.score < 75 ? "Good" : "Strong"}
                      </span>
                    </div>
                    <div className="w-full h-1 bg-[rgba(255,255,255,0.07)] rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${passwordStrength.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${passwordStrength.score}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    {passwordStrength.feedback.length > 0 && (
                      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                        {passwordStrength.feedback.map((item, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-[11px] text-[rgba(240,237,232,0.35)]">
                            <span className="w-1 h-1 rounded-full bg-[rgba(240,237,232,0.25)]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

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

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-[12px] font-semibold text-[rgba(240,237,232,0.5)] uppercase tracking-[0.08em] mb-2.5"
                >
                  Confirm password <span className="text-[#E07328] normal-case tracking-normal">*</span>
                </label>
                <div className="relative group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={registerData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    autoComplete="new-password"
                    placeholder="Re-enter password"
                    className={`w-full bg-[rgba(255,255,255,0.04)] border rounded-[10px] px-4 py-3.5 pl-11 pr-11 text-[14px] text-[#f0ede8] placeholder-[rgba(240,237,232,0.22)] outline-none transition-all duration-200 focus:bg-[rgba(255,255,255,0.06)] ${
                      errors.confirmPassword
                        ? "border-red-500/40 focus:border-red-500/70 focus:ring-1 focus:ring-red-500/30"
                        : registerData.confirmPassword && registerData.password === registerData.confirmPassword
                        ? "border-[rgba(39,201,63,0.4)] focus:border-[rgba(39,201,63,0.6)] focus:ring-1 focus:ring-[rgba(39,201,63,0.2)]"
                        : "border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.14)] focus:border-[rgba(224,115,40,0.5)] focus:ring-1 focus:ring-[rgba(224,115,40,0.2)]"
                    }`}
                  />
                  <Lock
                    className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                      errors.confirmPassword
                        ? "text-red-400"
                        : registerData.confirmPassword && registerData.password === registerData.confirmPassword
                        ? "text-[#27c93f]"
                        : "text-[rgba(240,237,232,0.3)] group-focus-within:text-[#E07328]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[rgba(240,237,232,0.3)] hover:text-[rgba(240,237,232,0.7)] transition-colors p-0.5"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  {registerData.confirmPassword && registerData.password === registerData.confirmPassword && (
                    <Check className="absolute right-10 top-1/2 -translate-y-1/2 w-4 h-4 text-[#27c93f]" />
                  )}
                </div>
                {errors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mt-1.5 text-[12px] text-red-400 flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-red-400 shrink-0" />
                    {errors.confirmPassword}
                  </motion.p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting || showSuccess}
                whileHover={{ scale: isSubmitting ? 1 : 1.015 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.985 }}
                className="w-full mt-2 flex items-center justify-center gap-2.5 py-3.5 rounded-[10px] text-[14px] font-semibold text-white bg-[#E07328] shadow-[0_0_24px_rgba(224,115,40,0.35)] hover:bg-[#f07d30] hover:shadow-[0_0_36px_rgba(224,115,40,0.5)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-200"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating your store…</span>
                  </>
                ) : showSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Store created!</span>
                  </>
                ) : (
                  <>
                    <Store className="w-4 h-4" />
                    <span>Create my store — free</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Sign in link */}
            <div className="mt-7 pt-6 border-t border-[rgba(255,255,255,0.07)] text-center">
              <p className="text-[13px] text-[rgba(240,237,232,0.4)]">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#E07328] hover:text-[#f07d30] font-semibold transition-colors"
                >
                  Sign in →
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
            No credit card needed · Live in under a minute · Built for Bhutan
          </motion.p>
        </div>
      </div>

      <Footer />
    </div>
  );
}