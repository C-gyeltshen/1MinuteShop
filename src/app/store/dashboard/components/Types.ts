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

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  totalAmount: number;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
  items: number;
};

export interface ProductFormData {
  productName: string;
  price: string;
  stockQuantity: string;
  description: string;
  productImageUrl: string;
}