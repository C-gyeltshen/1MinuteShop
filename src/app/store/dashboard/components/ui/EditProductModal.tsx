"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { EditProductFormData, EditProductModalProps } from "../Types";

const inputCls = "w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-[8px] text-[14px] text-[#F0EDE8] placeholder:text-[#F0EDE8]/28 outline-none focus:border-brand-orange/[0.40] focus:bg-white/[0.06] transition-all font-space-grotesk";

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen, onClose, onSubmit, product,
}) => {
  const [formData, setFormData] = useState<EditProductFormData>({
    productName: "", price: "", stockQuantity: "", description: "", productImageUrl: "",
  });
  const [errors, setErrors] = useState<Partial<EditProductFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.productName,
        price: product.price.toString(),
        stockQuantity: product.stockQuantity.toString(),
        description: product.description,
        productImageUrl: product.productImageUrl,
      });
      setErrors({});
    }
  }, [product]);

  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof EditProductFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<EditProductFormData> = {};
    if (!formData.productName.trim()) newErrors.productName = "Product name is required";
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = "Price must be greater than 0";
    if (!formData.stockQuantity || parseInt(formData.stockQuantity) < 0) newErrors.stockQuantity = "Valid stock quantity required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.productImageUrl.trim()) {
      newErrors.productImageUrl = "Image URL is required";
    } else {
      try { new URL(formData.productImageUrl); } catch { newErrors.productImageUrl = "Enter a valid URL"; }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !product) return;
    setIsSubmitting(true);
    try {
      await onSubmit(product.id, formData);
      handleClose();
    } catch {
      // error handled upstream
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ productName: "", price: "", stockQuantity: "", description: "", productImageUrl: "" });
    setErrors({});
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 motion-safe:animate-fade-in">
      <div className="bg-[#131316] border border-white/[0.07] rounded-[20px] shadow-dm-card w-full max-w-2xl max-h-[90vh] overflow-y-auto dm-scroll motion-safe:animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 bg-[#131316] border-b border-white/[0.07] px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-[19px] font-bold text-[#F0EDE8] tracking-tight font-space-grotesk">Edit Product</h2>
            <p className="text-[13px] text-[#F0EDE8]/46 mt-0.5 font-space-grotesk">Update the details below.</p>
          </div>
          <button onClick={handleClose} disabled={isSubmitting}
            className="w-9 h-9 rounded-[8px] border border-white/[0.08] bg-white/[0.04] flex items-center justify-center text-[#F0EDE8]/46 hover:bg-white/[0.08] transition-all disabled:opacity-50">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Product name */}
          <div>
            <label className="block text-[12px] font-semibold text-[#F0EDE8]/46 mb-1.5 font-space-grotesk uppercase tracking-wider">
              Product Name <span className="text-dm-danger">*</span>
            </label>
            <input type="text" name="productName" value={formData.productName} onChange={handleChange}
              className={`${inputCls} ${errors.productName ? "border-dm-danger/[0.40]" : ""}`}
              placeholder="Enter product name" disabled={isSubmitting} />
            {errors.productName && <p className="mt-1 text-[12px] text-dm-danger font-space-grotesk">{errors.productName}</p>}
          </div>

          {/* Price + Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-[#F0EDE8]/46 mb-1.5 font-space-grotesk uppercase tracking-wider">
                Price (Nu.) <span className="text-dm-danger">*</span>
              </label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} step="0.01" min="0"
                className={`${inputCls} ${errors.price ? "border-dm-danger/[0.40]" : ""}`}
                placeholder="0.00" disabled={isSubmitting} />
              {errors.price && <p className="mt-1 text-[12px] text-dm-danger font-space-grotesk">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#F0EDE8]/46 mb-1.5 font-space-grotesk uppercase tracking-wider">
                Stock Quantity <span className="text-dm-danger">*</span>
              </label>
              <input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleChange} min="0"
                className={`${inputCls} ${errors.stockQuantity ? "border-dm-danger/[0.40]" : ""}`}
                placeholder="0" disabled={isSubmitting} />
              {errors.stockQuantity && <p className="mt-1 text-[12px] text-dm-danger font-space-grotesk">{errors.stockQuantity}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[12px] font-semibold text-[#F0EDE8]/46 mb-1.5 font-space-grotesk uppercase tracking-wider">
              Description <span className="text-dm-danger">*</span>
            </label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={4}
              className={`${inputCls} resize-none leading-relaxed ${errors.description ? "border-dm-danger/[0.40]" : ""}`}
              placeholder="Enter product description" disabled={isSubmitting} />
            {errors.description && <p className="mt-1 text-[12px] text-dm-danger font-space-grotesk">{errors.description}</p>}
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-[12px] font-semibold text-[#F0EDE8]/46 mb-1.5 font-space-grotesk uppercase tracking-wider">
              Product Image URL <span className="text-dm-danger">*</span>
            </label>
            <input type="url" name="productImageUrl" value={formData.productImageUrl} onChange={handleChange}
              className={`${inputCls} font-space-mono ${errors.productImageUrl ? "border-dm-danger/[0.40]" : ""}`}
              placeholder="https://example.com/image.jpg" disabled={isSubmitting} />
            {errors.productImageUrl && <p className="mt-1 text-[12px] text-dm-danger font-space-grotesk">{errors.productImageUrl}</p>}
            {formData.productImageUrl && !errors.productImageUrl && (
              <div className="mt-2">
                <img src={formData.productImageUrl} alt="Preview"
                  className="w-24 h-24 object-cover rounded-[8px] border border-white/[0.07]"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-2 border-t border-white/[0.07]">
            <button type="button" onClick={handleClose} disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 border border-white/[0.08] text-[#F0EDE8]/72 rounded-[10px] text-[13px] font-semibold hover:bg-white/[0.06] transition-colors font-space-grotesk disabled:opacity-50">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 bg-brand-orange text-white rounded-[10px] text-[13px] font-semibold shadow-glow-orange hover:bg-brand-orange-hover transition-all disabled:opacity-60 font-space-grotesk">
              {isSubmitting ? "Updating…" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
