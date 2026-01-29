import React from "react";
import { BarChart3, Package, ShoppingCart } from "lucide-react";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  tab: string;
  activeTab: string;
  setActiveTab: (t: string) => void;
  setIsMobileMenuOpen?: (o: boolean) => void;
}

const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  label,
  tab,
  activeTab,
  setActiveTab,
  setIsMobileMenuOpen,
}) => (
  <button
    onClick={() => {
      setActiveTab(tab);
      setIsMobileMenuOpen?.(false);
    }}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all w-full ${
      activeTab === tab
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  setIsMobileMenuOpen,
}) => {
  return (
    <nav className="space-y-2">
      <NavItem
        icon={BarChart3}
        label="Dashboard"
        tab="dashboard"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <NavItem
        icon={Package}
        label="Products"
        tab="products"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <NavItem
        icon={ShoppingCart}
        label="Orders"
        tab="orders"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <NavItem
        icon={ShoppingCart}
        label="Credits"
        tab="credits"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    </nav>
  );
};

export default Sidebar;