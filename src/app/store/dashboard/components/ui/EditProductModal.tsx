import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export interface EditProductFormData {
  productName: string;
  price: string;
  stockQuantity: string;
  description: string;
  productImageUrl: string;
}

export interface Product {
  id: string;
  productName: string;
  price: number;
  stockQuantity: number;
  description: string;
  productImageUrl: string;
  createdAt: string;
}

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productId: string, formData: EditProductFormData) => void;
  product: Product | null;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  product,
}) => {
  const [formData, setFormData] = useState<EditProductFormData>({
    productName: "",
    price: "",
    stockQuantity: "",
    description: "",
    productImageUrl: "",
  });

  const [errors, setErrors] = useState<Partial<EditProductFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form when product changes
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name as keyof EditProductFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<EditProductFormData> = {};

    if (!formData.productName.trim()) {
      newErrors.productName = "Product name is required";
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (
      !formData.stockQuantity ||
      parseInt(formData.stockQuantity) < 0 ||
      !Number.isInteger(Number(formData.stockQuantity))
    ) {
      newErrors.stockQuantity = "Stock quantity must be a valid whole number";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.productImageUrl.trim()) {
      newErrors.productImageUrl = "Product image URL is required";
    } else {
      // Basic URL validation
      try {
        new URL(formData.productImageUrl);
      } catch {
        newErrors.productImageUrl = "Please enter a valid URL";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate() || !product) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(product.id, formData);
      handleClose();
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      productName: "",
      price: "",
      stockQuantity: "",
      description: "",
      productImageUrl: "",
    });
    setErrors({});
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-xl font-semibold text-gray-900">Edit Product</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isSubmitting}
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Product Name */}
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.productName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter product name"
              disabled={isSubmitting}
            />
            {errors.productName && (
              <p className="mt-1 text-sm text-red-500">{errors.productName}</p>
            )}
          </div>

          {/* Price and Stock Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.price ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="0.00"
                disabled={isSubmitting}
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-500">{errors.price}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="stockQuantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="stockQuantity"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                min="0"
                step="1"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.stockQuantity ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="0"
                disabled={isSubmitting}
              />
              {errors.stockQuantity && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.stockQuantity}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter product description"
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Product Image URL */}
          <div>
            <label
              htmlFor="productImageUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="productImageUrl"
              name="productImageUrl"
              value={formData.productImageUrl}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.productImageUrl ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="https://example.com/image.jpg"
              disabled={isSubmitting}
            />
            {errors.productImageUrl && (
              <p className="mt-1 text-sm text-red-500">
                {errors.productImageUrl}
              </p>
            )}
            {formData.productImageUrl && !errors.productImageUrl && (
              <div className="mt-2">
                <img
                  src={formData.productImageUrl}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded border border-gray-200"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;