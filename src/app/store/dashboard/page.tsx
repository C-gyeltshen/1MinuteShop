"use client"

import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Store,
  Package,
  DollarSign,
  X,
  Upload,
} from "lucide-react";
import AuthProvider from "@/app/shared/store/authStore";

type Product = {
  id: number | null;
  name: string;
  description: string;
  price: number | string;
  quantity: number | string;
  image: string;
};

export default function ShopDashboard() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Wireless Headphones",
      description:
        "Premium noise-canceling headphones with 30-hour battery life",
      price: 299.99,
      quantity: 45,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200",
    },
    {
      id: 2,
      name: "Smart Watch",
      description: "Fitness tracker with heart rate monitor and GPS",
      price: 199.99,
      quantity: 32,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200",
    },
    {
      id: 3,
      name: "Laptop Backpack",
      description: "Water-resistant backpack with laptop compartment",
      price: 79.99,
      quantity: 15,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200",
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product>({
    id: null,
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const showNotification = (message: string, type: string = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000
    );
  };

  const handleOpenDialog = (product: Product | null = null) => {
    if (product) {
      setEditMode(true);
      setCurrentProduct(product);
      setImagePreview(product.image);
    } else {
      setEditMode(false);
      setCurrentProduct({
        id: null,
        name: "",
        description: "",
        price: "",
        quantity: "",
        image: "",
      });
      setImagePreview("");
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentProduct({
      id: null,
      name: "",
      description: "",
      price: "",
      quantity: "",
      image: "",
    });
    setImagePreview("");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setCurrentProduct({ ...currentProduct, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = () => {
    if (
      !currentProduct.name ||
      !currentProduct.price ||
      !currentProduct.quantity
    ) {
      showNotification("Please fill in all required fields", "error");
      return;
    }

    if (editMode) {
      setProducts(
        products.map((p) => (p.id === currentProduct.id ? currentProduct : p))
      );
      showNotification("Product updated successfully!");
    } else {
      const newProduct = {
        ...currentProduct,
        id: Math.max(...products.map((p) => p.id || 0), 0) + 1,
        price: parseFloat(currentProduct.price as string),
        quantity: parseInt(currentProduct.quantity as string),
      };
      setProducts([...products, newProduct]);
      showNotification("Product added successfully!");
    }
    handleCloseDialog();
  };

  const handleDeleteProduct = (id: number | null) => {
    setProducts(products.filter((p) => p.id !== id));
    showNotification("Product deleted successfully!", "info");
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalValue = products.reduce(
    (sum, p) => sum + parseFloat(p.price as any) * parseInt(p.quantity as any),
    0
  );
  const totalQuantity = products.reduce(
    (sum, p) => sum + parseInt(p.quantity as any),
    0
  );

  return (
    // <AuthProvider>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      {notification.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div
            className={`rounded-lg shadow-lg px-6 py-4 flex items-center space-x-3 ${
              notification.type === "error"
                ? "bg-red-500 text-white"
                : notification.type === "info"
                ? "bg-blue-500 text-white"
                : "bg-green-500 text-white"
            }`}
          >
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Store className="w-10 h-10 text-[#ff6800]" />
          <h1 className="text-4xl font-bold text-white">Shop Dashboard</h1>
        </div>
        <p className="text-slate-400 text-lg">
          Manage your products and inventory
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-[#ff6800]/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Total Products</p>
              <p className="text-4xl font-bold text-[#ff6800]">
                {products.length}
              </p>
            </div>
            <Package className="w-12 h-12 text-[#ff6800] opacity-50" />
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Total Inventory</p>
              <p className="text-4xl font-bold text-green-500">
                {totalQuantity}
              </p>
            </div>
            <Store className="w-12 h-12 text-green-500 opacity-50" />
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Total Value</p>
              <p className="text-4xl font-bold text-blue-500">
                Nu. {totalValue.toFixed(2)}
              </p>
            </div>
            <DollarSign className="w-12 h-12 text-blue-500 opacity-50" />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-[#ff6800] transition-colors"
          />
        </div>
        <button
          onClick={() => handleOpenDialog()}
          className="bg-[#ff6800] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#e55f00] transition-colors flex items-center justify-center space-x-2 whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Product</span>
        </button>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Description
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">
                  Price
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">
                  Quantity
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-slate-400"
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-t border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-14 h-14 rounded-lg bg-slate-700 flex items-center justify-center overflow-hidden">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <svg
                              className="w-6 h-6 text-slate-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <rect
                                x="3"
                                y="3"
                                width="18"
                                height="18"
                                rx="2"
                                ry="2"
                                strokeWidth="2"
                              />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <polyline points="21 15 16 10 5 21" />
                            </svg>
                          )}
                        </div>
                        <span className="text-white font-medium">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400 max-w-xs truncate">
                      {product.description}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                        Nu. {parseFloat(product.price as any).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          parseInt(product.quantity as any) < 20
                            ? "bg-red-500/20 text-red-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {product.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleOpenDialog(product)}
                          className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/20 transition-colors"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {openDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-2xl font-bold text-white">
                {editMode ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={handleCloseDialog}
                className="p-2 rounded-lg text-slate-400 hover:bg-slate-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Product Image
                </label>
                <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 text-center hover:border-[#ff6800] transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {imagePreview ? (
                      <div className="space-y-3">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-lg mx-auto"
                        />
                        <p className="text-sm text-slate-400">
                          Click to change image
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Upload className="w-12 h-12 text-slate-400 mx-auto" />
                        <p className="text-slate-400">
                          Click to upload product image
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Product Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={currentProduct.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-[#ff6800] transition-colors"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={currentProduct.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-[#ff6800] transition-colors resize-none"
                  placeholder="Enter product description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Price <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="number"
                      name="price"
                      value={currentProduct.price}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      className="w-full pl-8 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-[#ff6800] transition-colors"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Quantity <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={currentProduct.quantity}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-[#ff6800] transition-colors"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-slate-700">
              <button
                onClick={handleCloseDialog}
                className="px-6 py-3 rounded-xl text-slate-300 hover:bg-slate-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProduct}
                className="px-6 py-3 bg-[#ff6800] text-white rounded-xl font-semibold hover:bg-[#e55f00] transition-colors"
              >
                {editMode ? "Update" : "Add"} Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    // </AuthProvider>
  );
}