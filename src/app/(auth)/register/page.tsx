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
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
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
    status: ""
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
    if (!registerData.ownerName.trim()) {
      newErrors.ownerName = "Full name is required";
    } else if (registerData.ownerName.trim().length < 2) {
      newErrors.ownerName = "Full name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(registerData.ownerName.trim())) {
      newErrors.ownerName = "Full name can only contain letters and spaces";
    }

    // Shop name validation
    if (!registerData.storeName.trim()) {
      newErrors.storeName = "Shop name is required";
    } else if (registerData.storeName.trim().length < 2) {
      newErrors.storeName = "Shop name must be at least 2 characters";
    } else if (registerData.storeName.trim().length > 50) {
      newErrors.storeName = "Shop name must be less than 50 characters";
    } else if (!/^[a-zA-Z0-9\s\-'&.]+$/.test(registerData.storeName.trim())) {
      newErrors.storeName = "Shop name contains invalid characters";
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
      formData.append("ownerName", registerData.ownerName);
      formData.append("storeName", registerData.storeName);
      formData.append("status", "active")

      // Call the server action
      await signup(formData);
      setShowSuccess(true);

      // Reset form
      setRegisterData({
        ownerName: "",
        storeName: "",
        email: "",
        password: "",
        confirmPassword: "",
        status: ""
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
                Create Your Store
              </h2>
              <p className="text-slate-400">
                Join thousands of entrepreneurs and start your ecommerce journey
                today
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
                  Account created successfully! Check your email.
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

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name Field */}
              <div>
                <label
                  htmlFor="ownerName"
                  className="block text-sm font-semibold text-slate-300 mb-3"
                >
                  Full Name <span className="text-[#ff6800]">*</span>
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
                    className={`w-full px-4 py-4 pl-12 border-2 rounded-2xl focus:ring-2 focus:ring-[#ff6800] focus:border-[#ff6800] transition-all duration-200 bg-slate-700/50 hover:bg-slate-700 text-white placeholder-slate-400 ${
                      errors.ownerName
                        ? "border-red-500/50 bg-red-500/10 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-600 hover:border-slate-500"
                    }`}
                    placeholder="John Doe"
                  />
                  <User
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                      errors.ownerName
                        ? "text-red-400"
                        : "text-slate-400 group-hover:text-[#ff6800]"
                    }`}
                  />
                </div>
                {errors.ownerName && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mt-2 text-sm text-red-400 flex items-center"
                  >
                    <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                    {errors.ownerName}
                  </motion.p>
                )}
              </div>

              {/* Shop Name Field */}
              <div>
                <label
                  htmlFor="storeName"
                  className="block text-sm font-semibold text-slate-300 mb-3"
                >
                  Shop Name <span className="text-[#ff6800]">*</span>
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
                    className={`w-full px-4 py-4 pl-12 border-2 rounded-2xl focus:ring-2 focus:ring-[#ff6800] focus:border-[#ff6800] transition-all duration-200 bg-slate-700/50 hover:bg-slate-700 text-white placeholder-slate-400 ${
                      errors.storeName
                        ? "border-red-500/50 bg-red-500/10 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-600 hover:border-slate-500"
                    }`}
                    placeholder="My Awesome Store"
                  />
                  <Store
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                      errors.storeName
                        ? "text-red-400"
                        : "text-slate-400 group-hover:text-[#ff6800]"
                    }`}
                  />
                </div>
                {registerData.storeName && (
                  <p className="mt-1 text-xs text-slate-400">
                    Your store URL will be:{" "}
                    {registerData.storeName
                      .toLowerCase()
                      .replace(/[^a-z0-9]/g, "-")
                      .replace(/-+/g, "-")
                      .replace(/^-|-$/g, "")}
                    .1minuteshop.com
                  </p>
                )}
                {errors.storeName && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mt-2 text-sm text-red-400 flex items-center"
                  >
                    <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                    {errors.storeName}
                  </motion.p>
                )}
              </div>

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
                    value={registerData.email}
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
                    value={registerData.password}
                    onChange={handleInputChange}
                    required
                    autoComplete="new-password"
                    className={`w-full px-4 py-4 pl-12 pr-12 border-2 rounded-2xl focus:ring-2 focus:ring-[#ff6800] focus:border-[#ff6800] transition-all duration-200 bg-slate-700/50 hover:bg-slate-700 text-white placeholder-slate-400 ${
                      errors.password
                        ? "border-red-500/50 bg-red-500/10 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-600 hover:border-slate-500"
                    }`}
                    placeholder="Create a strong password"
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

                {/* Password Strength Indicator */}
                {registerData.password && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-300">
                        Password Strength
                      </span>
                      <span className="text-sm text-slate-400">
                        {passwordStrength.score < 25
                          ? "Weak"
                          : passwordStrength.score < 50
                          ? "Fair"
                          : passwordStrength.score < 75
                          ? "Good"
                          : "Strong"}
                      </span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${passwordStrength.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${passwordStrength.score}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    {passwordStrength.feedback.length > 0 && (
                      <ul className="mt-2 text-xs text-slate-400 space-y-1">
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
                    className="mt-2 text-sm text-red-400 flex items-center"
                  >
                    <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-slate-300 mb-3"
                >
                  Confirm Password <span className="text-[#ff6800]">*</span>
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
                    className={`w-full px-4 py-4 pl-12 pr-12 border-2 rounded-2xl focus:ring-2 focus:ring-[#ff6800] focus:border-[#ff6800] transition-all duration-200 bg-slate-700/50 hover:bg-slate-700 text-white placeholder-slate-400 ${
                      errors.confirmPassword
                        ? "border-red-500/50 bg-red-500/10 focus:border-red-500 focus:ring-red-500"
                        : registerData.confirmPassword &&
                          registerData.password === registerData.confirmPassword
                        ? "border-green-500/50 bg-green-500/10"
                        : "border-slate-600 hover:border-slate-500"
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
                        : "text-slate-400 group-hover:text-[#ff6800]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-[#ff6800] transition-colors p-1 rounded-lg hover:bg-slate-700"
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
                      <Check className="absolute right-10 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
                    )}
                </div>
                {errors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mt-2 text-sm text-red-400 flex items-center"
                  >
                    <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                    {errors.confirmPassword}
                  </motion.p>
                )}
              </div>
              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || showSuccess}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full bg-gradient-to-r from-[#ff6800] to-[#ff9d4d] text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-[#ff6800]/30 hover:shadow-xl hover:shadow-[#ff6800]/40 transform transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
              <div className="text-center pt-6 border-t border-slate-600">
                <p className="text-slate-400">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-[#ff6800] hover:text-[#ff9d4d] font-semibold transition-colors hover:underline"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
            {/* Security Notice */}
          </motion.div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
