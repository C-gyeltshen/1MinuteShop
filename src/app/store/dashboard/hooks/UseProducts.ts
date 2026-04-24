import { useState, useEffect } from "react";
import { Product, ProductFormData } from "../components/Types";
import { useCurrentUser } from "@/app/shared/store/authStore";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Get the user and ID
  const user = useCurrentUser();
  const storeOwnerId = user?.id;

  useEffect(() => {
    const fetchStoreProducts = async () => {
      // 2. Wait for the ID to be available before fetching
      if (!storeOwnerId) return;

      try {
        setLoading(true);
        // 3. Use the dynamic storeOwnerId in the URL
        const response = await fetch(
          `${BACKEND_URL}/products/store/${storeOwnerId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        ); 

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const result = await response.json();

        if (result && Array.isArray(result)) {
          setProducts(result);
        } else if (
          result &&
          result.products &&
          Array.isArray(result.products)
        ) {
          setProducts(result.products);
        } else if (result && result.data && Array.isArray(result.data)) {
          setProducts(result.data);
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreProducts();
    
    // 4. Add storeOwnerId to dependency array so it re-runs when user loads
  }, [storeOwnerId]); 

  // ... rest of your addProduct/editProduct functions ...
  const addProduct = (formData: ProductFormData) => {
    // ... logic ...
    const newProduct: Product = {
      id: String(products.length + 1),
      productName: formData.productName,
      price: Number.parseFloat(formData.price),
      stockQuantity: Number.parseInt(formData.stockQuantity),
      description: formData.description,
      productImageUrl: formData.productImageUrl,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setProducts([newProduct, ...products]);
  };

const editProduct = async (productId: string, formData: ProductFormData) => {
  if (!storeOwnerId) {
    throw new Error("Store owner ID is not available");
  }

  try {
    const response = await fetch(
      `http://localhost:8080/api/products/${productId}/store/${storeOwnerId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({  
          productName: formData.productName,
          price: Number.parseFloat(formData.price),
          stockQuantity: Number.parseInt(formData.stockQuantity),
          description: formData.description,
          productImageUrl: formData.productImageUrl,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to update product: ${response.status}`);
    }

    const result = await response.json();

    // Update local state after successful response
    setProducts(
      products.map((product) =>
        product.id === productId
          ? {
              ...product,
              productName: formData.productName,
              price: Number.parseFloat(formData.price),
              stockQuantity: Number.parseInt(formData.stockQuantity),
              description: formData.description,
              productImageUrl: formData.productImageUrl,
            }
          : product,
      ),
    );

    return result;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

  return {
    products,
    loading,
    error,
    addProduct,
    editProduct,
  };
};