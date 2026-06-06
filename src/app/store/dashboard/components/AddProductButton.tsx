"use client";
import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { useCurrentUser } from "@/app/shared/store/authStore";
import { AddProductModalProps, ProductFormData } from "./Types";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

const inputCls = "w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-[8px] text-[14px] text-[#F0EDE8] placeholder:text-[#F0EDE8]/28 outline-none focus:border-brand-orange/[0.40] focus:bg-white/[0.06] transition-all font-space-grotesk";

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const user = useCurrentUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string>("");
  const [formData, setFormData] = useState<ProductFormData>({
    productName: "", price: "", stockQuantity: "", description: "", productImageUrl: "",
  });
  const [imagePreview, setImagePreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<ProductFormData>>({});
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {};
    if (!formData.productName.trim()) newErrors.productName = "Product name is required";
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = "Valid price is required";
    if (!formData.stockQuantity || parseInt(formData.stockQuantity) < 0) newErrors.stockQuantity = "Valid stock quantity is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadImageViaBackend = async (file: File): Promise<string> => {
    setUploadProgress("Preparing image...");
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    setUploadProgress("Uploading image to server...");
    const response = await fetch(`${BACKEND_URL}/upload/image`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: base64, fileName: file.name, fileType: file.type, userId: user?.id }),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Failed to upload image");
    }
    const data = await response.json();
    if (!data.success || !data.url) throw new Error("Upload failed: No URL returned");
    setUploadProgress("Image uploaded successfully!");
    return data.url;
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      setUploadProgress("");
      if (!user?.id) throw new Error("User ID not found. Please try logging in again.");
      let imageUrl = formData.productImageUrl;
      if (selectedFile) imageUrl = await uploadImageViaBackend(selectedFile);
      setUploadProgress("Creating product...");
      const response = await fetch(`${BACKEND_URL}/products/store/${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: formData.productName,
          price: parseFloat(formData.price),
          stockQuantity: parseInt(formData.stockQuantity),
          description: formData.description,
          productImageUrl: imageUrl,
        }),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to add product");
      }
      setUploadProgress("Product added successfully!");
      onSubmit({ ...formData, productImageUrl: imageUrl });
      handleClose();
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Failed to add product. Please try again.");
      setUploadProgress("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ productName: "", price: "", stockQuantity: "", description: "", productImageUrl: "" });
    setImagePreview("");
    setSelectedFile(null);
    setErrors({});
    setSubmitError(null);
    setUploadProgress("");
    onClose();
  };

  const processImageFile = (file: File) => {
    if (file.size > 10 * 1024 * 1024) { setSubmitError("Image size must be less than 10MB"); return; }
    setSelectedFile(file);
    setSubmitError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string);
      setFormData((prev) => ({ ...prev, productImageUrl: "" }));
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 motion-safe:animate-fade-in">
      <div className="bg-[#131316] border border-white/[0.07] rounded-[20px] shadow-dm-card w-full max-w-2xl max-h-[90vh] overflow-y-auto dm-scroll motion-safe:animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 bg-[#131316] border-b border-white/[0.07] px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-[19px] font-bold text-[#F0EDE8] tracking-tight font-space-grotesk">Add New Product</h2>
            <p className="text-[13px] text-[#F0EDE8]/46 mt-0.5 font-space-grotesk">Add a new item to your catalogue.</p>
          </div>
          <button onClick={handleClose} disabled={isSubmitting}
            className="w-9 h-9 rounded-[8px] border border-white/[0.08] bg-white/[0.04] flex items-center justify-center text-[#F0EDE8]/46 hover:bg-white/[0.08] transition-all disabled:opacity-50">
            <X size={16} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {submitError && (
            <div className="p-3.5 bg-dm-danger/[0.10] border border-dm-danger/[0.20] rounded-[10px] text-[13px] text-dm-danger font-space-grotesk">
              {submitError}
            </div>
          )}
          {uploadProgress && (
            <div className="p-3.5 bg-dm-info/[0.10] border border-dm-info/[0.20] rounded-[10px] flex items-center gap-2 text-[13px] text-dm-info font-space-grotesk">
              <Loader2 className="animate-spin shrink-0" size={16} />
              {uploadProgress}
            </div>
          )}

          <div>
            <label className="block text-[12px] font-semibold text-[#F0EDE8]/46 mb-1.5 font-space-grotesk uppercase tracking-wider">
              Product Name <span className="text-dm-danger">*</span>
            </label>
            <input type="text" value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              className={`${inputCls} ${errors.productName ? "border-dm-danger/[0.40]" : ""}`}
              placeholder="Enter product name" disabled={isSubmitting} />
            {errors.productName && <p className="mt-1 text-[12px] text-dm-danger font-space-grotesk">{errors.productName}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-[#F0EDE8]/46 mb-1.5 font-space-grotesk uppercase tracking-wider">
                Price (Nu.) <span className="text-dm-danger">*</span>
              </label>
              <input type="number" step="0.01" value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className={`${inputCls} ${errors.price ? "border-dm-danger/[0.40]" : ""}`}
                placeholder="0.00" disabled={isSubmitting} />
              {errors.price && <p className="mt-1 text-[12px] text-dm-danger font-space-grotesk">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#F0EDE8]/46 mb-1.5 font-space-grotesk uppercase tracking-wider">
                Stock Quantity <span className="text-dm-danger">*</span>
              </label>
              <input type="number" value={formData.stockQuantity}
                onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                className={`${inputCls} ${errors.stockQuantity ? "border-dm-danger/[0.40]" : ""}`}
                placeholder="0" disabled={isSubmitting} />
              {errors.stockQuantity && <p className="mt-1 text-[12px] text-dm-danger font-space-grotesk">{errors.stockQuantity}</p>}
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#F0EDE8]/46 mb-1.5 font-space-grotesk uppercase tracking-wider">
              Description <span className="text-dm-danger">*</span>
            </label>
            <textarea value={formData.description} rows={4}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`${inputCls} resize-none leading-relaxed ${errors.description ? "border-dm-danger/[0.40]" : ""}`}
              placeholder="Enter product description" disabled={isSubmitting} />
            {errors.description && <p className="mt-1 text-[12px] text-dm-danger font-space-grotesk">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#F0EDE8]/46 mb-1.5 font-space-grotesk uppercase tracking-wider">
              Product Image {selectedFile && <span className="text-brand-orange normal-case tracking-normal">(File: {selectedFile.name})</span>}
            </label>
            {imagePreview && (
              <div className="mb-4 relative">
                <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-[10px] border border-white/[0.07]" />
                <button type="button" onClick={() => { setImagePreview(""); setFormData({ ...formData, productImageUrl: "" }); setSelectedFile(null); }}
                  disabled={isSubmitting}
                  className="absolute top-2 right-2 w-8 h-8 bg-dm-danger/[0.80] text-white rounded-[6px] flex items-center justify-center hover:bg-dm-danger transition-colors disabled:opacity-50">
                  <X size={14} />
                </button>
              </div>
            )}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f?.type.startsWith("image/")) processImageFile(f); }}
              className={`border-2 border-dashed rounded-[10px] p-8 text-center transition-all ${isDragging ? "border-brand-orange/[0.50] bg-brand-orange/[0.05]" : "border-white/[0.10] hover:border-white/[0.18]"}`}>
              <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f?.type.startsWith("image/")) processImageFile(f); }}
                className="hidden" id="file-upload" disabled={isSubmitting} />
              <label htmlFor="file-upload" className={`cursor-pointer ${isSubmitting ? "pointer-events-none opacity-50" : ""}`}>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-[10px] bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                    <span className="text-2xl">📷</span>
                  </div>
                  <p className="text-[13px] font-semibold text-[#F0EDE8]/72 font-space-grotesk">Drop an image here or click to upload</p>
                  <p className="text-[12px] text-[#F0EDE8]/34 font-space-grotesk">PNG, JPG, GIF up to 10MB</p>
                </div>
              </label>
            </div>
            <div className="mt-4">
              <p className="text-[12px] text-[#F0EDE8]/34 mb-2 text-center font-space-grotesk">Or paste image URL</p>
              <input type="url" value={formData.productImageUrl}
                onChange={(e) => { setFormData({ ...formData, productImageUrl: e.target.value }); setImagePreview(e.target.value); setSelectedFile(null); }}
                className={`${inputCls} font-space-mono`}
                placeholder="https://example.com/image.jpg" disabled={isSubmitting} />
            </div>
          </div>

          <div className="flex gap-3 pt-2 border-t border-white/[0.07]">
            <button type="button" onClick={handleClose} disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 border border-white/[0.08] text-[#F0EDE8]/72 rounded-[10px] text-[13px] font-semibold hover:bg-white/[0.06] transition-colors font-space-grotesk disabled:opacity-50">
              Cancel
            </button>
            <button type="button" onClick={handleSubmit} disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 bg-brand-orange text-white rounded-[10px] text-[13px] font-semibold shadow-glow-orange hover:bg-brand-orange-hover transition-all disabled:opacity-60 flex items-center justify-center gap-2 font-space-grotesk">
              {isSubmitting ? (
                <><Loader2 className="animate-spin" size={15} />{uploadProgress || "Processing..."}</>
              ) : "Add Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
