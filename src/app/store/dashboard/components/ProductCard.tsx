"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Edit, Package, Trash2 } from "lucide-react";
import { ProductCardProps } from "./Types";

function StockBadge({ qty }: { qty: number }) {
  if (qty <= 0)
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold bg-dm-danger/[0.12] text-dm-danger border border-dm-danger/[0.20]">
        <span className="w-1.5 h-1.5 rounded-full bg-dm-danger" />
        Out of stock
      </span>
    );
  if (qty < 20)
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold bg-dm-warning/[0.12] text-dm-warning border border-dm-warning/[0.20]">
        <span className="w-1.5 h-1.5 rounded-full bg-dm-warning" />
        {qty} left
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold bg-dm-success/[0.12] text-dm-success border border-dm-success/[0.20]">
      <span className="w-1.5 h-1.5 rounded-full bg-dm-success" />
      {qty} in stock
    </span>
  );
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isExpanded, onToggle, onEdit, onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(product.id);
    } finally {
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  return (
  <div
    className={`rounded-[14px] border bg-[rgba(18,18,20,0.72)] backdrop-blur-xl overflow-hidden transition-all duration-200
      ${isExpanded ? "border-brand-orange/[0.20]" : "border-white/[0.07] hover:border-white/[0.12]"}`}
  >
    <div className="flex items-center gap-3 p-4 cursor-pointer select-none" onClick={onToggle}>
      {product.productImageUrl ? (
        <img
          src={product.productImageUrl}
          alt={product.productName}
          className="w-12 h-12 rounded-[8px] object-cover border border-white/[0.07] shrink-0"
        />
      ) : (
        <div className="w-12 h-12 rounded-[8px] bg-white/[0.04] border border-white/[0.07] flex items-center justify-center shrink-0">
          <Package size={18} className="text-[#F0EDE8]/34" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-[#F0EDE8] truncate font-space-grotesk text-[14px]">
          {product.productName}
        </h3>
        <p className="text-[12px] text-[#F0EDE8]/46 font-space-mono mt-0.5">
          Nu.{product.price.toLocaleString()}
        </p>
      </div>
      <span className="text-[#F0EDE8]/34 shrink-0">
        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </span>
    </div>

    {isExpanded && (
      <div className="px-4 pb-4 border-t border-white/[0.07] pt-3 space-y-3">
        <StockBadge qty={product.stockQuantity} />
        {product.description && (
          <p className="text-[12.5px] text-[#F0EDE8]/46 font-space-grotesk leading-relaxed">
            {product.description}
          </p>
        )}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand-orange text-white rounded-[8px] text-[13px] font-semibold shadow-glow-orange hover:bg-brand-orange-hover transition-all font-space-grotesk"
          >
            <Edit size={14} /> Edit
          </button>
          {confirmDelete ? (
            <>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-1.5 px-4 py-2 bg-dm-danger/[0.15] border border-dm-danger/[0.40] text-dm-danger rounded-[8px] text-[13px] font-semibold transition-all font-space-grotesk disabled:opacity-50"
              >
                {deleting ? "…" : "Confirm"}
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-3 py-2 bg-white/[0.04] border border-white/[0.08] text-[#F0EDE8]/46 rounded-[8px] text-[13px] font-semibold transition-all font-space-grotesk"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-white/[0.04] border border-white/[0.08] text-[#F0EDE8]/46 rounded-[8px] text-[13px] font-semibold hover:bg-dm-danger/[0.12] hover:text-dm-danger hover:border-dm-danger/[0.20] transition-all font-space-grotesk"
            >
              <Trash2 size={14} /> Delete
            </button>
          )}
        </div>
      </div>
    )}
  </div>
  );
};

export default ProductCard;
