import React, { useState } from 'react';
import { X, Image, DollarSign, Package, FileText, Loader2 } from 'lucide-react';
import { useCurrentUser } from '@/app/shared/store/authStore';
import { createClient } from '../../../../../utils/superbase/client';

export type ProductFormData = {
  productName: string;
  price: string;
  stockQuantity: string;
  description: string;
  productImageUrl: string;
};

export type AddProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: ProductFormData) => void;
};

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const user = useCurrentUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string>('');

  const [formData, setFormData] = useState<ProductFormData>({
    productName: '',
    price: '',
    stockQuantity: '',
    description: '',
    productImageUrl: '',
  });

  const [imagePreview, setImagePreview] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Store the actual file
  const [errors, setErrors] = useState<Partial<ProductFormData>>({});
  const [isDragging, setIsDragging] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {};
    if (!formData.productName.trim()) newErrors.productName = 'Product name is required';
    if (!formData.price || Number.parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.stockQuantity || Number.parseInt(formData.stockQuantity) < 0) newErrors.stockQuantity = 'Valid stock quantity is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Upload image to Supabase Storage
  const uploadImageToSupabase = async (file: File): Promise<string> => {
    try {
      const supabase = createClient();
      
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}_${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      setUploadProgress('Uploading image...');

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('1MinuteShopBucket')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw new Error(`Upload failed: ${error.message}`);
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('1MinuteShopBucket')
        .getPublicUrl(filePath);

      setUploadProgress('Image uploaded successfully!');
      return publicUrl;

    } catch (error: any) {
      console.error('Error uploading image:', error);
      throw new Error(error.message || 'Failed to upload image');
    }
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        setIsSubmitting(true);
        setSubmitError(null);
        setUploadProgress('');

        if (!user?.id) {
          throw new Error("User ID not found. Please try logging in again.");
        }

        let imageUrl = formData.productImageUrl;

        // If user selected a file, upload it to Supabase first
        if (selectedFile) {
          imageUrl = await uploadImageToSupabase(selectedFile);
        }

        setUploadProgress('Saving product...');

        // Now make the POST request with the image URL
        const response = await fetch(`${BACKEND_URL}/products/store/${user.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productName: formData.productName,
            price: Number.parseFloat(formData.price),
            stockQuantity: Number.parseInt(formData.stockQuantity),
            description: formData.description,
            productImageUrl: imageUrl
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to add product');
        }

        setUploadProgress('Product added successfully!');
        
        // Pass the new product data back to parent
        onSubmit({
          ...formData,
          productImageUrl: imageUrl
        }); 
        handleClose();

      } catch (err: any) {
        console.error("Error adding product:", err);
        setSubmitError(err.message || "Failed to add product. Please try again.");
        setUploadProgress('');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleClose = () => {
    setFormData({
      productName: '',
      price: '',
      stockQuantity: '',
      description: '',
      productImageUrl: '',
    });
    setImagePreview('');
    setSelectedFile(null);
    setErrors({});
    setSubmitError(null);
    setUploadProgress('');
    onClose();
  };

  const handleImageUrlChange = (url: string) => {
    setFormData({ ...formData, productImageUrl: url });
    setImagePreview(url);
    setSelectedFile(null); // Clear file if URL is being used
  };

  const handleDragOver = (e: React.DragEvent) => { 
    e.preventDefault(); 
    setIsDragging(true); 
  };

  const handleDragLeave = () => { 
    setIsDragging(false); 
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); 
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file); // Store the actual file
      const reader = new FileReader();
      reader.onload = (event) => { 
        const url = event.target?.result as string; 
        setImagePreview(url);
        setFormData({ ...formData, productImageUrl: '' }); // Clear URL input
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file); // Store the actual file
      const reader = new FileReader();
      reader.onload = (event) => { 
        const url = event.target?.result as string; 
        setImagePreview(url);
        setFormData({ ...formData, productImageUrl: '' }); // Clear URL input
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
          <button onClick={handleClose} disabled={isSubmitting} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Global Error Message */}
          {submitError && (
             <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">
               {submitError}
             </div>
          )}

          {/* Upload Progress Message */}
          {uploadProgress && (
             <div className="p-4 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg">
               {uploadProgress}
             </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
            <div className="relative">
              <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                value={formData.productName} 
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })} 
                className={`w-full pl-10 pr-4 py-3 border ${errors.productName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`} 
                placeholder="Enter product name" 
                disabled={isSubmitting} 
              />
            </div>
            {errors.productName && <p className="mt-1 text-sm text-red-600">{errors.productName}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price (Nu.) *</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="number" 
                  step="0.01" 
                  value={formData.price} 
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
                  className={`w-full pl-10 pr-4 py-3 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`} 
                  placeholder="0.00" 
                  disabled={isSubmitting} 
                />
              </div>
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity *</label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="number" 
                  value={formData.stockQuantity} 
                  onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })} 
                  className={`w-full pl-10 pr-4 py-3 border ${errors.stockQuantity ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`} 
                  placeholder="0" 
                  disabled={isSubmitting} 
                />
              </div>
              {errors.stockQuantity && <p className="mt-1 text-sm text-red-600">{errors.stockQuantity}</p>}
            </div>
          </div>
          
          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-gray-400" size={20} />
              <textarea 
                value={formData.description} 
                onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                rows={4} 
                className={`w-full pl-10 pr-4 py-3 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`} 
                placeholder="Enter product description" 
                disabled={isSubmitting} 
              />
            </div>
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          {/* Product Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Image</label>
            {imagePreview && (
              <div className="mb-4 relative">
                <img src={imagePreview} alt="Product preview" className="w-full h-48 object-cover rounded-lg" />
                <button 
                  type="button" 
                  onClick={() => { 
                    setImagePreview(''); 
                    setFormData({ ...formData, productImageUrl: '' }); 
                    setSelectedFile(null);
                  }} 
                  disabled={isSubmitting} 
                  className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            )}
            <div 
              onDragOver={handleDragOver} 
              onDragLeave={handleDragLeave} 
              onDrop={handleDrop} 
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
            >
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileSelect} 
                className="hidden" 
                id="file-upload" 
                disabled={isSubmitting} 
              />
              <label htmlFor="file-upload" className={`cursor-pointer ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}>
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-gray-100 rounded-full mb-3">
                    <Image size={32} className="text-gray-400" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Drop an image here or click to upload</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </label>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2 text-center">Or paste image URL</p>
              <input 
                type="url" 
                value={formData.productImageUrl} 
                onChange={(e) => handleImageUrlChange(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="https://example.com/image.jpg" 
                disabled={isSubmitting} 
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  {uploadProgress || 'Processing...'}
                </>
              ) : (
                'Add Product'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;