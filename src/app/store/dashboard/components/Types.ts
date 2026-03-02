// Shared type definitions
export type Product = {
  id: string;
  productName: string;
  price: number;
  stockQuantity: number;
  description: string;
  productImageUrl: string;
  createdAt: string;
};

export type OrderItem = {
  id: string;
  quantity: number;
  unitPrice: string;
  product: {
    productName: string;
    productImageUrl: string;
  };
};

export interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productId: string, formData: EditProductFormData) => void;
  product: Product | null;
}

export type Order = {
  id: string;
  orderNumber: number;
  orderStatus: "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  paymentStatus: "PENDING" | "RECEIVED" | "FAILED";
  totalAmount: string;
  storeSubdomain: string;
  orderItems: OrderItem[];
  customer?: {
    customerName: string;
    email: string;
    phoneNumber: string;
  };
  shippingAddress?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingCountry?: string;
  customerNotes?: string;
  paymentScreenshotUrl?: string;
  createdAt?: string;
};

export interface ProductFormData {
  productName: string;
  price: string;
  stockQuantity: string;
  description: string;
  productImageUrl: string;
}

export type AddProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: ProductFormData) => void;
};

export interface EditProductFormData {
  productName: string;
  price: string;
  stockQuantity: string;
  description: string;
  productImageUrl: string;
}

export interface ContentSectionProps {
  activeTab: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddProduct: () => void;
  children: React.ReactNode;
}

export interface DashboardHeaderProps {
  storeName?: string;
  ownerName?: string;
  email?: string;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export interface OrderCardProps {
  order: Order;
  isExpanded: boolean;
  onToggle: () => void;
}

export interface ProductCardProps {
  product: Product;
  isExpanded: boolean;
  onToggle: () => void;
  onEdit: (product: Product) => void;
}

export interface ProductsViewProps {
  products: Product[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
  expandedRow: string | null;
  setExpandedRow: (id: string | null) => void;
  onEdit: (product: Product) => void;
  onAddProduct: () => void;
}

export interface NavItemProps {
  icon: React.ElementType;
  label: string;
  tab: string;
  activeTab: string;
  setActiveTab: (t: string) => void;
  setIsMobileMenuOpen?: (o: boolean) => void;
}

export interface StatusBadgeProps {
  status: string;
  type?: "order" | "payment";
}

export interface StatsCardsProps {
  products: Product[];
}

export interface OrdersViewProps {
  searchQuery: string;
  expandedRow: string | null;
  setExpandedRow: (id: string | null) => void;
}