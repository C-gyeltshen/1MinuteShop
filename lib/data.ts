// Store information
export const storeInfo = {
  name: 'TechStyle',
  tagline: 'Where Innovation Meets Style',
  description: 'At TechStyle, we believe technology should be both functional and beautiful. Founded in 2020, we curate the finest selection of premium tech accessories and lifestyle products that seamlessly blend cutting-edge innovation with modern design. Our mission is to help you express your unique style while staying connected to what matters most.',
  contact: {
    email: 'hello@techstyle.com',
    phone: '+1 (555) 123-4567',
    address: '123 Innovation Street, Tech District, San Francisco, CA 94105'
  },
  social: {
    instagram: 'https://instagram.com/techstyle',
    twitter: 'https://twitter.com/techstyle',
    facebook: 'https://facebook.com/techstyle'
  }
};

// Product interface
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

// Dummy products data
export const products: Product[] = [
  {
    id: 1,
    name: 'I love you, Sonam',
    price: 249,
    image: 'https://rjujjhznwbztovowyfgf.supabase.co/storage/v1/object/sign/namo/IMG_1515.PNG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jMTNkYzUzOC03MzI3LTQyMDQtOWE4NC01MDZlMzE0YTNjMzYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJuYW1vL0lNR18xNTE1LlBORyIsImlhdCI6MTc1Nzg1ODcwMiwiZXhwIjoxNzg5Mzk0NzAyfQ.VG9lGCNehDaglyTfvczh8wu6UWXze5akDTFWUL2VTTs',
    description: 'Premium wireless earbuds with active noise cancellation',
    category: 'Audio'
  },
  {
    id: 2,
    name: 'Smart Watch Series X',
    price: 399,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    description: 'Advanced fitness tracking and smart notifications',
    category: 'Wearables'
  },
  {
    id: 3,
    name: 'Minimalist Phone Case',
    price: 29,
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop',
    description: 'Ultra-thin protection with premium materials',
    category: 'Accessories'
  },
  {
    id: 4,
    name: 'Wireless Charging Pad',
    price: 79,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop',
    description: 'Fast wireless charging for all compatible devices',
    category: 'Accessories'
  },
  {
    id: 5,
    name: 'Bluetooth Speaker',
    price: 129,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
    description: 'Portable speaker with exceptional sound quality',
    category: 'Audio'
  },
  {
    id: 6,
    name: 'USB-C Hub',
    price: 89,
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500&h=500&fit=crop',
    description: 'Multi-port hub for ultimate connectivity',
    category: 'Accessories'
  },
  {
    id: 7,
    name: 'Ergonomic Mouse',
    price: 69,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    description: 'Comfortable design for all-day productivity',
    category: 'Peripherals'
  },
  {
    id: 8,
    name: 'Mechanical Keyboard',
    price: 159,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop',
    description: 'Premium switches for the perfect typing experience',
    category: 'Peripherals'
  }
];

// Navigation links
export const navigationLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#products', label: 'Products' },
  { href: '#contact', label: 'Contact' }
];