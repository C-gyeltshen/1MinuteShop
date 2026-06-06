"use client";
import React, { useState, useMemo } from "react";
import { Edit, Trash2, Package, Search, Plus, ChevronDown } from "lucide-react";
import ProductCard from "./ProductCard";
import { ProductsViewProps } from "./Types";

// Colorful initials avatar matching design
const AV_COLORS = ["#E07328", "#60A5FA", "#A78BFA", "#27C93F", "#FBBF24", "#2DD4BF", "#F472B6"];
function avatarColor(name: string) {
  let h = 0;
  for (const c of name) h = ((h * 31 + c.charCodeAt(0)) >>> 0);
  return AV_COLORS[h % AV_COLORS.length];
}
function getInitials(name: string) {
  const p = name.trim().split(/\s+/);
  return ((p[0]?.[0] ?? "") + (p[1]?.[0] ?? "")).toUpperCase();
}
function ProductAvatar({ name, imageUrl, size = 40 }: { name: string; imageUrl?: string; size?: number }) {
  const [imgErr, setImgErr] = React.useState(false);
  if (imageUrl && !imgErr) {
    return (
      <img src={imageUrl} alt={name} onError={() => setImgErr(true)}
        className="rounded-[8px] object-cover border border-white/[0.07] shrink-0"
        style={{ width: size, height: size }} />
    );
  }
  const color = avatarColor(name);
  return (
    <div className="rounded-[8px] flex items-center justify-center shrink-0 font-bold text-white font-space-grotesk text-[13px]"
      style={{
        width: size, height: size,
        background: `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 60%, #000))`,
      }}>
      {getInitials(name)}
    </div>
  );
}

function StockBadge({ qty }: { qty: number }) {
  if (qty <= 0)
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold bg-dm-danger/[0.12] text-dm-danger border border-dm-danger/[0.20]">
        <span className="w-1.5 h-1.5 rounded-full bg-dm-danger" />Out of stock
      </span>
    );
  if (qty < 20)
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold bg-dm-warning/[0.12] text-dm-warning border border-dm-warning/[0.20]">
        <span className="w-1.5 h-1.5 rounded-full bg-dm-warning" />{qty} left
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold bg-dm-success/[0.12] text-dm-success border border-dm-success/[0.20]">
      <span className="w-1.5 h-1.5 rounded-full bg-dm-success" />{qty} in stock
    </span>
  );
}

const STOCK_FILTERS = [
  { value: "ALL",  label: "All status" },
  { value: "IN",   label: "In stock" },
  { value: "LOW",  label: "Low stock" },
  { value: "OUT",  label: "Out of stock" },
];

const ProductsView: React.FC<ProductsViewProps> = ({
  products, loading, error, expandedRow, setExpandedRow, onEdit, onDelete, onAddProduct,
}) => {
  const [q, setQ] = useState("");
  const [stockFilter, setStockFilter] = useState("ALL");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (productId: string) => {
    setDeletingId(productId);
    try {
      await onDelete(productId);
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  const filtered = useMemo(() => products.filter((p) => {
    const okQ = !q || p.productName.toLowerCase().includes(q.toLowerCase());
    const okS =
      stockFilter === "ALL" ? true :
      stockFilter === "OUT" ? p.stockQuantity <= 0 :
      stockFilter === "LOW" ? p.stockQuantity > 0 && p.stockQuantity < 20 :
      p.stockQuantity >= 20;
    return okQ && okS;
  }), [products, q, stockFilter]);

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-14 bg-white/[0.04] rounded-[12px] animate-pulse" style={{ animationDelay: `${i * 60}ms` }} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
        <div className="w-14 h-14 rounded-[14px] bg-dm-danger/[0.10] border border-dm-danger/[0.20] flex items-center justify-center">
          <Package size={26} className="text-dm-danger" />
        </div>
        <h3 className="text-[16px] font-semibold text-[#F0EDE8] font-space-grotesk">Error Loading Products</h3>
        <p className="text-[13px] text-[#F0EDE8]/46 max-w-sm font-space-grotesk">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Filter bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F0EDE8]/34 pointer-events-none" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products"
              className="pl-9 pr-4 h-9 bg-white/[0.04] border border-white/[0.08] rounded-[8px] text-[13px] text-[#F0EDE8]/72 placeholder:text-[#F0EDE8]/28 outline-none focus:border-brand-orange/[0.40] focus:bg-white/[0.06] transition-all w-52 font-space-grotesk"
            />
          </div>
          {/* Stock filter */}
          <div className="relative">
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="appearance-none h-9 pl-3 pr-8 bg-white/[0.04] border border-white/[0.08] rounded-[8px] text-[13px] text-[#F0EDE8]/72 outline-none focus:border-brand-orange/[0.40] cursor-pointer transition-all font-space-grotesk"
            >
              {STOCK_FILTERS.map((f) => (
                <option key={f.value} value={f.value} style={{ background: "#131316", color: "#F0EDE8" }}>
                  {f.label}
                </option>
              ))}
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#F0EDE8]/34 pointer-events-none" />
          </div>
        </div>
        <button
          onClick={onAddProduct}
          className="flex items-center gap-1.5 px-4 h-9 bg-brand-orange text-white rounded-[10px] text-[13px] font-semibold shadow-glow-orange hover:bg-brand-orange-hover transition-all font-space-grotesk shrink-0"
        >
          <Plus size={15} /> Add product
        </button>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-[#131316] border border-white/[0.07] rounded-[18px] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 rounded-[14px] bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-4">
              <Package size={26} className="text-[#F0EDE8]/34" />
            </div>
            <h3 className="text-[15px] font-semibold text-[#F0EDE8] mb-1 font-space-grotesk">
              {q || stockFilter !== "ALL" ? "No products found" : "No Products Yet"}
            </h3>
            <p className="text-[13px] text-[#F0EDE8]/46 max-w-xs font-space-grotesk mb-4">
              {q || stockFilter !== "ALL"
                ? "Adjust your filters or search term."
                : "Start building your product catalogue by adding your first product."
              }
            </p>
            {!q && stockFilter === "ALL" && (
              <button onClick={onAddProduct}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-brand-orange text-white rounded-[10px] text-[13px] font-semibold shadow-glow-orange hover:bg-brand-orange-hover transition-all font-space-grotesk">
                <Plus size={15} /> Add Your First Product
              </button>
            )}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.07] bg-white/[0.02]">
                {["Product", "Price", "Stock", "Added", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[11px] font-semibold text-[#F0EDE8]/34 uppercase tracking-[0.06em] font-space-grotesk">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id}
                  className="border-b border-white/[0.05] hover:bg-white/[0.03] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <ProductAvatar name={product.productName} imageUrl={product.productImageUrl} size={44} />
                      <div>
                        <p className="font-semibold text-[#F0EDE8] font-space-grotesk text-[13.5px]">{product.productName}</p>
                        <p className="text-[11px] text-[#F0EDE8]/34 font-space-grotesk mt-0.5">ID: {product.id.slice(0, 8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-bold text-[#F0EDE8] font-space-mono text-[13.5px]">
                    Nu.{product.price.toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <StockBadge qty={product.stockQuantity} />
                  </td>
                  <td className="px-5 py-4 text-[12px] text-[#F0EDE8]/34 font-space-mono">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => onEdit(product)}
                        className="w-8 h-8 rounded-[8px] border border-white/[0.08] bg-white/[0.04] flex items-center justify-center text-[#F0EDE8]/46 hover:bg-brand-orange/[0.15] hover:text-brand-orange hover:border-brand-orange/[0.25] transition-all">
                        <Edit size={14} />
                      </button>
                      {confirmDeleteId === product.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(product.id)}
                            disabled={deletingId === product.id}
                            className="h-8 px-2.5 rounded-[8px] border border-dm-danger/[0.40] bg-dm-danger/[0.15] text-dm-danger text-[11px] font-semibold font-space-grotesk hover:bg-dm-danger/[0.25] transition-all disabled:opacity-50">
                            {deletingId === product.id ? "…" : "Confirm"}
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="h-8 px-2 rounded-[8px] border border-white/[0.08] bg-white/[0.04] text-[#F0EDE8]/46 text-[11px] font-semibold font-space-grotesk hover:bg-white/[0.08] transition-all">
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(product.id)}
                          className="w-8 h-8 rounded-[8px] border border-white/[0.08] bg-white/[0.04] flex items-center justify-center text-[#F0EDE8]/46 hover:bg-dm-danger/[0.12] hover:text-dm-danger hover:border-dm-danger/[0.20] transition-all">
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-white/[0.07]">
            <p className="text-[12px] text-[#F0EDE8]/34 font-space-grotesk">
              {filtered.length} of {products.length} product{products.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Package size={40} className="text-[#F0EDE8]/24 mb-3" />
            <p className="text-[14px] font-semibold text-[#F0EDE8] font-space-grotesk mb-1">
              {q || stockFilter !== "ALL" ? "No products found" : "No Products Yet"}
            </p>
            {!q && stockFilter === "ALL" && (
              <button onClick={onAddProduct}
                className="mt-3 flex items-center gap-1.5 px-4 py-2 bg-brand-orange text-white rounded-[8px] text-[13px] font-semibold font-space-grotesk">
                <Plus size={14} /> Add Product
              </button>
            )}
          </div>
        ) : (
          filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isExpanded={expandedRow === product.id}
              onToggle={() => setExpandedRow(expandedRow === product.id ? null : product.id)}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsView;
