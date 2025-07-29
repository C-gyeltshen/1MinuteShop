import { Package } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function StatusCard() {
  const products = [
    {
      id: 1,
      name: "Basketball Shoes",
      price: 4000,
      description: "Premium basketball footwear",
      image: "/products/1.avif",
    },
    {
      id: 2,
      name: "Basketball Jersey",
      price: 2500,
      description: "Official team jerseys",
      image: "/products/2.avif",
    },
    {
      id: 3,
      name: "Basketball",
      price: 1800,
      description: "Professional grade basketball",
      image: "/products/3.avif",
    },
    {
      id: 4,
      name: "Sports Shorts",
      price: 1500,
      description: "Comfortable athletic shorts",
      image: "/products/4.avif",
    },
    {
      id: 5,
      name: "Training Gear",
      price: 3200,
      description: "Professional training equipment",
      image: "/products/1.avif",
    },
    {
      id: 6,
      name: "Sports Bag",
      price: 2800,
      description: "Durable sports carry bag",
      image: "/products/2.avif",
    },
    {
      id: 7,
      name: "Water Bottle",
      price: 800,
      description: "Insulated sports bottle",
      image: "/products/3.avif",
    },
    {
      id: 8,
      name: "Sweatband",
      price: 600,
      description: "Moisture-wicking sweatbands",
      image: "/products/4.avif",
    },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-indigo-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Total Products
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {products.length}
                </p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <Package className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-emerald-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Active Orders
                </p>
                <p className="text-3xl font-bold text-slate-900">24</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-full">
                <svg
                  className="h-6 w-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-amber-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Average Product Price
                </p>
                <p className="text-3xl font-bold text-slate-900">Nu. 5,600</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <svg
                  className="h-6 w-6 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
