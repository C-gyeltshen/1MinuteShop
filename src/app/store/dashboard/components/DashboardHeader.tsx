import React from "react";
import { Menu, Settings } from "lucide-react";

interface DashboardHeaderProps {
  storeName?: string;
  ownerName?: string;
  email?: string;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  storeName,
  ownerName,
  email,
  isMobileMenuOpen,
  onToggleMobileMenu,
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu size={20} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                {storeName || "My Store Portal"}
              </h1>
              {(ownerName || email) && (
                <span className="text-xs text-gray-500 font-normal">
                  Welcome, {ownerName || email}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;