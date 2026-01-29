import React from "react";
import { ChevronUp, ChevronDown, Edit, Eye } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { Order } from "./Types";

interface OrderCardProps {
  order: Order;
  isExpanded: boolean;
  onToggle: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  isExpanded,
  onToggle,
}) => (
  <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
    <div
      className="p-4 flex items-center justify-between cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900">{order.orderNumber}</h3>
        <p className="text-sm text-gray-600">{order.customerName}</p>
      </div>
      <div className="text-right mr-2">
        <p className="font-semibold text-gray-900">${order.totalAmount}</p>
      </div>
      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </div>

    {isExpanded && (
      <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-600">Order Status:</span>
            <div className="mt-1">
              <StatusBadge status={order.orderStatus} type="order" />
            </div>
          </div>
          <div>
            <span className="text-gray-600">Payment:</span>
            <div className="mt-1">
              <StatusBadge status={order.paymentStatus} type="payment" />
            </div>
          </div>
          <div>
            <span className="text-gray-600">Items:</span>
            <p className="font-semibold text-gray-900">{order.items}</p>
          </div>
          <div>
            <span className="text-gray-600">Date:</span>
            <p className="font-semibold text-gray-900">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
            <Eye size={16} /> View Details
          </button>
          <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
            <Edit size={16} />
          </button>
        </div>
      </div>
    )}
  </div>
);

export default OrderCard;
