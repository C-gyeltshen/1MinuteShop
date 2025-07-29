import React from 'react';
import { Button } from './button';
import { Menu, Search, ShoppingCart, User } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-[#2C3E50]">BB Store</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-orange-400 transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-400 transition-colors">
              Products
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-400 transition-colors">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-400 transition-colors">
              Contact
            </a>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            
            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}