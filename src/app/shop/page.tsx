"use client";

import React, { useState } from "react";

import { Store as StoreIcon, Edit, Camera } from "lucide-react";
import { useRouter } from 'next/navigation'
import { Card, CardContent } from "./components/card";
import { Button } from "./components/button";
import { Navbar } from "./components/Navbar";


const Store: React.FC = () => {
  const storeDetails = {
    name: "BB Store Thimphu",
    description: "Your one-stop shop for basketball lover",
    address: "Norzin Lam, Thimphu, Bhutan",
    contact: "+975 17123456",
    email: "contact@myawesomestore.com",
    bannerImage: "/products/store.webp", // Default placeholder image
  };
    const router = useRouter()

  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 4000,
      description: "Sample product description 1",
      image: "/products/1.avif",
    },
    {
      id: 2,
      name: "Product 2",
      price: 4000,
      description: "Sample product description 2",
      image: "/products/2.avif",
    },
    {
      id: 3,
      name: "Product 3",
      price: 4000,
      description: "Sample product description 3",
      image: "/products/3.avif",
    },
    {
      id: 4,
      name: "Product 4",
      price: 4000,
      description: "Sample product description 4",
      image: "/products/4.avif",
    },
    {
      id: 5,
      name: "Product 1",
      price: 4000,
      description: "Sample product description 1",
      image: "/products/1.avif",
    },
    {
      id: 6,
      name: "Product 2",
      price: 4000,
      description: "Sample product description 2",
      image: "/products/2.avif",
    },
    {
      id: 7,
      name: "Product 3",
      price: 4000,
      description: "Sample product description 3",
      image: "/products/3.avif",
    },
    {
      id: 8,
      name: "Product 4",
      price: 4000,
      description: "Sample product description 4",
      image: "/products/4.avif",
    },
  ];

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditBannerModalOpen, setIsEditBannerModalOpen] = useState(false);

  const handleEditStore = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEditBanner = () => {
    setIsEditBannerModalOpen(true);
  };

  const handleCloseEditBannerModal = () => {
    setIsEditBannerModalOpen(false);
  };

  return (
    <div className="w-full mx-auto font-sans text-[#2C3E50]">
      {/* <Header /> */}
      <Navbar />
      {/* Store Banner Image */}
      <div className="relative w-full h-64 md:h-80 mb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
        <img
          src={storeDetails.bannerImage}
          alt={`${storeDetails.name} banner`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
          <h1 className="text-2xl md:text-4xl font-bold font-serif">{storeDetails.name}</h1>
          <p className="mt-2 text-sm md:text-base max-w-2xl">{storeDetails.description}</p>
        </div>
        <Button
          variant="outline"
          onClick={handleEditBanner}
          className="absolute top-4 right-4 bg-white/80 hover:bg-orange-400 hover:text-white transition-all duration-300 rounded-full"
        >
          <Camera className="h-4 w-4 mr-2" />
          Change Banner
        </Button>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Store Details Card */}
        <Card className="mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-xl md:text-2xl text-[#2C3E50]">
                Store Details
              </h2>
              <Button
                variant="outline"
                onClick={handleEditStore}
                className="hover:bg-orange-400 hover:text-white transition-all duration-300 rounded-full text-sm md:text-base px-4 md:px-6 py-2"
              >
                <StoreIcon className="h-4 w-4 mr-2" />
                Edit Store
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm md:text-base font-medium">Store Name</p>
                <p className="text-sm md:text-base">{storeDetails.name}</p>
              </div>
              <div>
                <p className="text-sm md:text-base font-medium">Description</p>
                <p className="text-sm md:text-base">{storeDetails.description}</p>
              </div>
              <div>
                <p className="text-sm md:text-base font-medium">Address</p>
                <p className="text-sm md:text-base">{storeDetails.address}</p>
              </div>
              <div>
                <p className="text-sm md:text-base font-medium">Contact</p>
                <p className="text-sm md:text-base">{storeDetails.contact}</p>
              </div>
              <div>
                <p className="text-sm md:text-base font-medium">Email</p>
                <p className="text-sm md:text-base">{storeDetails.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-xl md:text-2xl text-[#2C3E50]">
                Featured Products
              </h2>
              <Button
                variant="outline"
                className="hover:bg-orange-400 hover:text-white transition-all duration-300 rounded-full text-sm md:text-base px-4 md:px-6 py-2"
              >
                Manage Products
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-all duration-200"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-sm md:text-base font-medium">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {product.description}
                  </p>
                  <p className="text-sm md:text-base font-medium">
                    Nu.{product.price}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/customer/productDetails')}
                    className="mt-4 w-full hover:bg-orange-400 hover:text-white transition-all duration-300 rounded-full text-sm md:text-base"
                  >
                    View Details
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <Button
                variant="outline"
                className="hover:bg-orange-400 hover:text-white transition-all duration-300 rounded-full text-sm md:text-base px-4 md:px-6 py-2"
              >
                See More
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Edit Store Modal (Placeholder) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="font-serif text-xl mb-4">Edit Store Details</h3>
            <p className="text-sm mb-4">
              This is a placeholder for the store edit form. Implement your form
              here.
            </p>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={handleCloseEditModal}
                className="hover:bg-gray-200 transition-all duration-300 rounded-full text-sm md:text-base"
              >
                Cancel
              </Button>
              <Button
                className="bg-[#006d5b] text-white hover:bg-[#005a49] transition-all duration-300 rounded-full text-sm md:text-base"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Banner Modal (Placeholder) */}
      {isEditBannerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="font-serif text-xl mb-4">Change Banner Image</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 flex flex-col items-center justify-center">
              <Camera className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 text-center">
                Drag and drop your image here, or click to browse
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Recommended size: 1200 x 400 pixels
              </p>
              <Button className="mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-300 rounded-full text-sm">
                Upload Image
              </Button>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={handleCloseEditBannerModal}
                className="hover:bg-gray-200 transition-all duration-300 rounded-full text-sm md:text-base"
              >
                Cancel
              </Button>
              <Button
                className="bg-[#006d5b] text-white hover:bg-[#005a49] transition-all duration-300 rounded-full text-sm md:text-base"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;