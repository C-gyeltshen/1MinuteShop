"use client";

import React, { useState } from "react";
import { Menu, X, ShoppingBag, ClipboardList, Store, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const centerNavItems = [
    { href: "/merchant/orderListing", label: "Orders", icon: ShoppingBag },
    { href: "/merchant/productListing", label: "Products", icon: ClipboardList },
    { href: "/merchant/mystore", label: "My Store", icon: Store },
  ];

  const profileNavItem = { href: "/merchant/profile", label: "My Profile", icon: User };

  return (
    <nav className="sticky top-0 z-50 bg-[#1B4965] shadow-md transition-all duration-300">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/merchant/productListing">
              <Image
                src="/cocologo.png"
                alt="Coco Commercial Logo"
                width={50}
                height={50}
                className="sm:mr-8"
              />
            </Link>
          </div>

          {/* Center Navigation (Desktop) */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-8">
              {centerNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 text-white px-6 py-2 rounded-md transition-all duration-300 hover:bg-orange-400 ${
                    isActive(item.href) ? "bg-orange-400" : ""
                  }`}
                  aria-label={`Go to ${item.label}`}
                >
                  <item.icon size={20} className="text-white" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Profile Section (Right End, Desktop) */}
          <div className="hidden md:flex items-center">
            <Link
              href={profileNavItem.href}
              className={`flex items-center space-x-2 text-white px-6 py-2 rounded-md transition-all duration-300 hover:bg-orange-400 ${
                isActive(profileNavItem.href) ? "bg-orange-400" : ""
              }`}
              aria-label={`Go to ${profileNavItem.label}`}
            >
              <profileNavItem.icon size={20} className="text-white" />
              <span>{profileNavItem.label}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              type="button"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              {[profileNavItem, ...centerNavItems].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 text-white px-6 py-2 transition-all duration-300 hover:bg-orange-400 ${
                    isActive(item.href) ? "bg-orange-400" : ""
                  }`}
                  aria-label={`Go to ${item.label}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon size={20} className="text-white" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;