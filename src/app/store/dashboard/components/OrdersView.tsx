import React from "react";
import OrderCard from "./OrderCard";
import StatusBadge from "./StatusBadge";
import { Order } from "./Types";

interface OrdersViewProps {
  orders: Order[];
  searchQuery: string;
  expandedRow: string | null;
  setExpandedRow: (id: string | null) => void;
}

const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  searchQuery,
  expandedRow,
  setExpandedRow,
}) => {
  const filteredOrders = orders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {order.orderNumber}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {order.customerName}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={order.orderStatus} />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  ${order.totalAmount}
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filteredOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            isExpanded={expandedRow === order.id}
            onToggle={() =>
              setExpandedRow(expandedRow === order.id ? null : order.id)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default OrdersView;