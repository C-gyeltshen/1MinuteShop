'use client'

import { Store, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-2">
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
                            <Store className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            1MinuteShop
                        </span>
                    </div>

                    {/* Desktop Button Group */}
                    <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
                        <button 
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 lg:px-6 py-2 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm lg:text-base"
                            type="button"
                            onClick={() => router.push('/login')}
                        >
                            Sign In
                        </button>
                        <button 
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 lg:px-6 py-2 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm lg:text-base"
                            type="button"
                            onClick={() => router.push('/register')}
                        >
                            <span className="hidden lg:inline">Start Building Free</span>
                            <span className="lg:hidden">Get Started</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-slate-200 py-4">
                        <div className="flex flex-col space-y-3">
                            <button 
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 text-center"
                                type="button"
                                onClick={() => {
                                    router.push('/login');
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                Sign In
                            </button>
                            <button 
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 text-center"
                                type="button"
                                onClick={() => {
                                    router.push('/register');
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                Start Building Free
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}