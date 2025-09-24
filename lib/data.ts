// Store information
export const storeInfo = {
  name: "TechStyle",
  tagline: "Where Innovation Meets Style",
  description:
    "At TechStyle, we believe technology should be both functional and beautiful. Founded in 2020, we curate the finest selection of premium tech accessories and lifestyle products that seamlessly blend cutting-edge innovation with modern design. Our mission is to help you express your unique style while staying connected to what matters most.",
  contact: {
    email: "hello@techstyle.com",
    phone: "+1 (555) 123-4567",
    address: "123 Innovation Street, Tech District, San Francisco, CA 94105",
  },
  social: {
    instagram: "https://instagram.com/techstyle",
    twitter: "https://twitter.com/techstyle",
    facebook: "https://facebook.com/techstyle",
  },
};

// Product interface
export interface Product {
  id: string; // UUID from database
  name: string;
  price: number;
  image_url: string; // From database
  description: string;
  category?: string; // Optional since it's not in database
  quantity: number;
  store_name: string; // From database
  created_at?: string;
  modified_at?: string;
}

// Legacy interface for backward compatibility
export interface LegacyProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  quantity: number;
}

// Dummy products data (for fallback/testing)
export const products: LegacyProduct[] = [
  {
    id: 1,
    name: "Wireless AirPods Pro",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=500&fit=crop",
    description: "Premium wireless earbuds with active noise cancellation",
    category: "Audio",
    quantity: 23,
  },
  {
    id: 2,
    name: "Smart Watch Series X",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    description: "Advanced fitness tracking and smart notifications",
    category: "Wearables",
    quantity: 23,
  },
  {
    id: 3,
    name: "Minimalist Phone Case",
    price: 29,
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop",
    description: "Ultra-thin protection with premium materials",
    category: "Accessories",
    quantity: 23,
  },
  {
    id: 4,
    name: "Wireless Charging Pad",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop",
    description: "Fast wireless charging for all compatible devices",
    category: "Accessories",
    quantity: 23,
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
    description: "Portable speaker with exceptional sound quality",
    category: "Audio",
    quantity: 23,
  },
  {
    id: 6,
    name: "USB-C Hub",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500&h=500&fit=crop",
    description: "Multi-port hub for ultimate connectivity",
    category: "Accessories",
    quantity: 23,
  },
  {
    id: 7,
    name: "Ergonomic Mouse",
    price: 69,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
    description: "Comfortable design for all-day productivity",
    category: "Peripherals",
    quantity: 23,
  },
  {
    id: 8,
    name: "Mechanical Keyboard",
    price: 159,
    image:
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop",
    description: "Premium switches for the perfect typing experience",
    category: "Peripherals",
    quantity: 23,
  },
];

// Navigation links
export const navigationLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#products", label: "Products" },
  { href: "#contact", label: "Contact" },
  { href: "#quantity", lable: "Quantity" },
];
