"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  UserPlus,
  Mail,
  Lock,
  Shield,
  User,
  Store,
  AlertCircle,
  CheckCircle,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Left from "./components/left";
import { signup } from "../../shared/services/authServices";

interface RegisterData {
  fullName: string;
  shopName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  agreeToMarketing: boolean;
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
    fullName: "",
    shopName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToMarketing: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    feedback: [],
    color: "bg-gray-200",
  });

  const calculatePasswordStrength = (password: string): PasswordStrength => {
    let score = 0;
    const feedback: string[] = [];

    if (password.length >= 8) {
      score += 25;
    } else {
      feedback.push("At least 8 characters");
    }

    if (/[A-Z]/.test(password)) {
      score += 25;
    } else {
      feedback.push("One uppercase letter");
    }

    if (/[a-z]/.test(password)) {
      score += 25;
    } else {
      feedback.push("One lowercase letter");
    }

    if (/[0-9]/.test(password)) {
      score += 12.5;
    } else {
      feedback.push("One number");
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score += 12.5;
    } else {
      feedback.push("One special character");
    }

    let color = "bg-red-400";
    if (score >= 75) color = "bg-green-400";
    else if (score >= 50) color = "bg-yellow-400";
    else if (score >= 25) color = "bg-orange-400";

    return { score, feedback, color };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setRegisterData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Calculate password strength
    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: RegisterErrors = {};

    // Full name validation
    if (!registerData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (registerData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(registerData.fullName.trim())) {
      newErrors.fullName = "Full name can only contain letters and spaces";
    }

    // Shop name validation
    if (!registerData.shopName.trim()) {
      newErrors.shopName = "Shop name is required";
    } else if (registerData.shopName.trim().length < 2) {
      newErrors.shopName = "Shop name must be at least 2 characters";
    } else if (registerData.shopName.trim().length > 50) {
      newErrors.shopName = "Shop name must be less than 50 characters";
    } else if (!/^[a-zA-Z0-9\s\-'&.]+$/.test(registerData.shopName.trim())) {
      newErrors.shopName = "Shop name contains invalid characters";
    }

    // Email validation
    if (!registerData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!registerData.password) {
      newErrors.password = "Password is required";
    } else if (passwordStrength.score < 50) {
      newErrors.password = "Password is too weak";
    }

    // Confirm password validation
    if (!registerData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms agreement validation
    if (!registerData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
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

    try {
      // Create FormData object for the server action
      const formData = new FormData();
      formData.append("email", registerData.email);
      formData.append("password", registerData.password);
      // We could also add other fields like name, though the current server action doesn't use them
      formData.append("name", registerData.fullName);
      formData.append("shopName", registerData.shopName);

      // Call the server action
      await signup(formData);

      // If we reach here, it means the redirect didn't happen
      // This could be because we're in development mode
      setShowSuccess(true);

      // Reset form
      setRegisterData({
        fullName: "",
        shopName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
        agreeToMarketing: false,
      });
      setPasswordStrength({ score: 0, feedback: [], color: "bg-gray-200" });
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ general: "Registration failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-200px)]">
          {/* Left Column - Features */}
          <Left />

          {/* Right Column - Register Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-10"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              >
                <Shield className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
                Create Your Store
              </h2>
              <p className="text-slate-600">
                Join thousands of entrepreneurs and start your ecommerce journey
                today
              </p>
            </div>

            {/* Success Message */}
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3"
              >
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-medium">
                  Account created successfully! Check your email.
                </span>
              </motion.div>
            )}

            {/* General Error Message */}
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-800">{errors.general}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name Field */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-semibold text-slate-700 mb-3"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={registerData.fullName}
                    onChange={handleInputChange}
                    required
                    autoComplete="name"
                    className={`w-full px-4 py-4 pl-12 border-2 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-slate-50/50 hover:bg-white ${
                      errors.fullName
                        ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    placeholder="John Doe"
                  />
                  <User
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                      errors.fullName
                        ? "text-red-400"
                        : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mt-2 text-sm text-red-600 flex items-center"
                  >
                    <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                    {errors.fullName}
                  </motion.p>
                )}
              </div>

              {/* Shop Name Field */}
              <div>
                <label
                  htmlFor="shopName"
                  className="block text-sm font-semibold text-slate-700 mb-3"
                >
                  Shop Name <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    id="shopName"
                    name="shopName"
                    value={registerData.shopName}
                    onChange={handleInputChange}
                    required
                    autoComplete="organization"
                    className={`w-full px-4 py-4 pl-12 border-2 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-slate-50/50 hover:bg-white ${
                      errors.shopName
                        ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    placeholder="My Awesome Store"
                  />
                  <Store
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                      errors.shopName
                        ? "text-red-400"
                        : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  />
                </div>
                {registerData.shopName && (
                  <p className="mt-1 text-xs text-slate-500">
                    Your store URL will be:{" "}
                    {registerData.shopName
                      .toLowerCase()
                      .replace(/[^a-z0-9]/g, "-")
                      .replace(/-+/g, "-")
                      .replace(/^-|-$/g, "")}
                    .1minuteshop.com
                  </p>
                )}
                {errors.shopName && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mt-2 text-sm text-red-600 flex items-center"
                  >
                    <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                    {errors.shopName}
                  </motion.p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-700 mb-3"
                >
                  Email Address <span className="text-red-500">*</span>
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
                    className={`w-full px-4 py-4 pl-12 border-2 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-slate-50/50 hover:bg-white ${
                      errors.email
                        ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    placeholder="john@company.com"
                  />
                  <Mail
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                      errors.email
                        ? "text-red-400"
                        : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mt-2 text-sm text-red-600 flex items-center"
                  >
                    <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-slate-700 mb-3"
                >
                  Password <span className="text-red-500">*</span>
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
                    className={`w-full px-4 py-4 pl-12 pr-12 border-2 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-slate-50/50 hover:bg-white ${
                      errors.password
                        ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    placeholder="Create a strong password"
                  />
                  <Lock
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                      errors.password
                        ? "text-red-400"
                        : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100"
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

                {/* Password Strength Indicator */}
                {registerData.password && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">
                        Password Strength
                      </span>
                      <span className="text-sm text-slate-500">
                        {passwordStrength.score < 25
                          ? "Weak"
                          : passwordStrength.score < 50
                          ? "Fair"
                          : passwordStrength.score < 75
                          ? "Good"
                          : "Strong"}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${passwordStrength.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${passwordStrength.score}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    {passwordStrength.feedback.length > 0 && (
                      <ul className="mt-2 text-xs text-slate-600 space-y-1">
                        {passwordStrength.feedback.map((item, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-1 h-1 bg-slate-400 rounded-full mr-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mt-2 text-sm text-red-600 flex items-center"
                  >
                    <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-slate-700 mb-3"
                >
                  Confirm Password <span className="text-red-500">*</span>
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
                    className={`w-full px-4 py-4 pl-12 pr-12 border-2 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-slate-50/50 hover:bg-white ${
                      errors.confirmPassword
                        ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500"
                        : registerData.confirmPassword &&
                          registerData.password === registerData.confirmPassword
                        ? "border-green-300 bg-green-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    placeholder="Confirm your password"
                  />
                  <Lock
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                      errors.confirmPassword
                        ? "text-red-400"
                        : registerData.confirmPassword &&
                          registerData.password === registerData.confirmPassword
                        ? "text-green-400"
                        : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  {registerData.confirmPassword &&
                    registerData.password === registerData.confirmPassword && (
                      <Check className="absolute right-10 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                </div>
                {errors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mt-2 text-sm text-red-600 flex items-center"
                  >
                    <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                    {errors.confirmPassword}
                  </motion.p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    checked={registerData.agreeToTerms}
                    onChange={handleInputChange}
                    className={`h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded transition-all mt-1 ${
                      errors.agreeToTerms ? "border-red-500" : ""
                    }`}
                  />
                  <label
                    htmlFor="agreeToTerms"
                    className="ml-3 block text-sm text-slate-700 cursor-pointer"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-indigo-600 hover:text-indigo-500 font-medium underline"
                    >
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-indigo-600 hover:text-indigo-500 font-medium underline"
                    >
                      Privacy Policy
                    </Link>
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                </div>
                {errors.agreeToTerms && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm text-red-600 flex items-center ml-7"
                  >
                    <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                    {errors.agreeToTerms}
                  </motion.p>
                )}

                <div className="flex items-start">
                  <input
                    id="agreeToMarketing"
                    name="agreeToMarketing"
                    type="checkbox"
                    checked={registerData.agreeToMarketing}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded transition-all mt-1"
                  />
                  <label
                    htmlFor="agreeToMarketing"
                    className="ml-3 block text-sm text-slate-700 cursor-pointer"
                  >
                    I would like to receive marketing emails and product updates{" "}
                    <span className="text-slate-400">(Optional)</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || showSuccess}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Your Store...</span>
                  </>
                ) : showSuccess ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Store Created!</span>
                  </>
                ) : (
                  <>
                    <Store className="w-5 h-5" />
                    <span>Create My Store</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>

              {/* Sign In Link */}
              <div className="text-center pt-6 border-t border-slate-200">
                <p className="text-slate-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-indigo-600 hover:text-indigo-500 font-semibold transition-colors hover:underline"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>

            {/* Social Registration Options */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500 font-medium">
                    Or sign up with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-flex justify-center items-center py-3 px-4 border-2 border-slate-200 rounded-xl shadow-sm bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="ml-2">Google</span>
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-flex justify-center items-center py-3 px-4 border-2 border-slate-200 rounded-xl shadow-sm bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="ml-2">GitHub</span>
                </motion.button>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-xs text-slate-600 text-center">
                <Shield className="w-4 h-4 inline mr-1" />
                Your information is protected with bank-level 256-bit SSL
                encryption
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
