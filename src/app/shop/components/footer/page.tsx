import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2C3E50] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="col-span-1">
          <h3 className="font-serif text-lg mb-4">BB Store</h3>
          <p className="text-sm text-gray-300 mb-2">Your one-stop shop for basketball lovers.</p>
          <p className="text-sm text-gray-300">Norzin Lam, Thimphu, Bhutan</p>
        </div>

        {/* Quick Links */}
        <div className="col-span-1">
          <h3 className="font-serif text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-sm text-gray-300 hover:text-orange-400 transition-colors duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link href="/customer/all-products" className="text-sm text-gray-300 hover:text-orange-400 transition-colors duration-200">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-sm text-gray-300 hover:text-orange-400 transition-colors duration-200">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-gray-300 hover:text-orange-400 transition-colors duration-200">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="col-span-1">
          <h3 className="font-serif text-lg mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/faq" className="text-sm text-gray-300 hover:text-orange-400 transition-colors duration-200">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/shipping-policy" className="text-sm text-gray-300 hover:text-orange-400 transition-colors duration-200">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="text-sm text-gray-300 hover:text-orange-400 transition-colors duration-200">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service" className="text-sm text-gray-300 hover:text-orange-400 transition-colors duration-200">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media & Newsletter (Placeholder) */}
        <div className="col-span-1">
          <h3 className="font-serif text-lg mb-4">Connect With Us</h3>
          <div className="flex space-x-4 mb-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-orange-400 transition-colors duration-200">
              <Facebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-orange-400 transition-colors duration-200">
              <Twitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-orange-400 transition-colors duration-200">
              <Instagram size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-orange-400 transition-colors duration-200">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
        &copy; {currentYear} BB Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;