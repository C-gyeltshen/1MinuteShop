import { Order } from "../components/Types";

export const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-001",
    customerName: "John Doe",
    totalAmount: 159.98,
    orderStatus: "DELIVERED",
    paymentStatus: "PAID",
    createdAt: "2024-01-20",
    items: 2,
  },
  {
    id: "2",
    orderNumber: "ORD-002",
    customerName: "Jane Smith",
    totalAmount: 79.99,
    orderStatus: "SHIPPED",
    paymentStatus: "PAID",
    createdAt: "2024-01-21",
    items: 1,
  },
  {
    id: "3",
    orderNumber: "ORD-003",
    customerName: "Bob Johnson",
    totalAmount: 234.97,
    orderStatus: "PROCESSING",
    paymentStatus: "PAID",
    createdAt: "2024-01-22",
    items: 3,
  },
  {
    id: "4",
    orderNumber: "ORD-004",
    customerName: "Alice Brown",
    totalAmount: 49.99,
    orderStatus: "PENDING",
    paymentStatus: "PENDING",
    createdAt: "2024-01-23",
    items: 1,
  },
];
