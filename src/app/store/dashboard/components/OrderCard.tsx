"use client";
import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { OrderCardProps } from "./Types";

const OrderCard: React.FC<OrderCardProps> = ({ order, isExpanded, onToggle }) => {
  const itemCount = order.orderItems.reduce((s, i) => s + i.quantity, 0);
  return (
    <div
      className={`rounded-[14px] border bg-[rgba(18,18,20,0.72)] backdrop-blur-xl overflow-hidden transition-all duration-200
        ${isExpanded ? "border-brand-orange/[0.25] shadow-glow-orange" : "border-white/[0.07] hover:border-white/[0.12]"}`}
    >
      <div
        className="flex items-center gap-3 p-4 cursor-pointer select-none"
        onClick={onToggle}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <span className="font-bold text-[#F0EDE8] font-space-mono">#{order.orderNumber}</span>
            <span className="font-semibold text-[#F0EDE8] shrink-0 font-space-mono text-[14px]">
              Nu.{parseFloat(order.totalAmount).toLocaleString()}
            </span>
          </div>
          {order.customer && (
            <p className="text-[12px] text-[#F0EDE8]/46 mt-0.5 font-space-grotesk truncate">
              {order.customer.customerName}
            </p>
          )}
          <p className="text-[11px] text-[#F0EDE8]/34 mt-0.5 font-space-grotesk">
            {itemCount} item{itemCount !== 1 ? "s" : ""}
          </p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <StatusBadge status={order.orderStatus} type="order" />
            <StatusBadge status={order.paymentStatus} type="payment" />
          </div>
        </div>
        <span className="text-[#F0EDE8]/34 ml-1 shrink-0">
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-white/[0.07] pt-4 space-y-3">
          {order.customer && (
            <div className="text-[13px] text-[#F0EDE8]/58 space-y-1 font-space-grotesk">
              <p>{order.customer.email}</p>
              <p>{order.customer.phoneNumber}</p>
            </div>
          )}
          {order.shippingAddress && (
            <p className="text-[12px] text-[#F0EDE8]/46 font-space-grotesk">
              {order.shippingAddress}, {order.shippingCity}
            </p>
          )}
          {order.createdAt && (
            <p className="text-[11px] text-[#F0EDE8]/34 font-space-mono">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderCard;
