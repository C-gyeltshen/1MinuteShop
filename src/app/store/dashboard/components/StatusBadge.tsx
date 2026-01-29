import React from "react";

interface StatusBadgeProps {
  status: string;
  type?: "order" | "payment";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  type = "order",
}) => {
  const getStatusColor = () => {
    if (type === "order") {
      switch (status) {
        case "DELIVERED":
          return "bg-green-100 text-green-800";
        case "SHIPPED":
          return "bg-blue-100 text-blue-800";
        case "PROCESSING":
          return "bg-yellow-100 text-yellow-800";
        case "PENDING":
          return "bg-orange-100 text-orange-800";
        case "CANCELLED":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    } else {
      switch (status) {
        case "PAID":
          return "bg-green-100 text-green-800";
        case "PENDING":
          return "bg-yellow-100 text-yellow-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor()}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;