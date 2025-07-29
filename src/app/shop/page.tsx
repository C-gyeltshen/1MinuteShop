"use client";
import { useRouter } from 'next/navigation'
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Navbar } from "./components/ui/Navbar";
import Banner from "./components/banner/page";
import StatusCard from "./components/statusCard/page";
import Footer from './components/footer/page';
// import Footer from './components/Footer';


const Store: React.FC = () => {
  const storeDetails = {
    name: "BB Store Thimphu",
    description: "Your one-stop shop for basketball lover",
    address: "Norzin Lam, Thimphu, Bhutan",
    contact: "+975 17123456",
    email: "contact@myawesomestore.com",
    bannerImage: "/products/store.webp", 
  };
    const router = useRouter()

  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 4000,
      description: "Sample product description 1",
      image: "https://sothebys-com.brightspotcdn.com/dims4/default/5fea7eb/2147483647/strip/true/crop/3565x2377+0+0/resize/684x456!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2F34%2F20%2Ffe1c295f4819bb31e6c12c0699b9%2Fnike-airjordan1og-chicago.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 4000,
      description: "Sample product description 2",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj8Q1pKYijNP2h-6xYB9ecVHuOSqgBubEtHQ&s",
    },
    {
      id: 3,
      name: "Product 3",
      price: 4000,
      description: "Sample product description 3",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQshfRdAjrt9TbIqBPLKp3e6Ct_AKXO-QqrhKFCuQOVz0pg-fhMgtb686Qr086Km98oVo&usqp=CAU",
    },
    {
      id: 4,
      name: "Product 4",
      price: 4000,
      description: "Sample product description 4",
      image: "https://media.gq.com/photos/5a9462ebdd582f0b3ac18bdb/master/pass/nike-lebron-15-equality-how-to-buy.jpg",
    },
    {
      id: 5,
      name: "Product 1",
      price: 4000,
      description: "Sample product description 1",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsuCakiUPlW7maeVwuiq1cP35id7cZ-9FuQDu0ZZtEZWYJikOaRY6ySZtk4eRQUBAyaTc&usqp=CAU",
    },
    {
      id: 6,
      name: "Product 2",
      price: 4000,
      description: "Sample product description 2",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPZfrMZgTQf1fryV74f0wmLpxTQsmxqa_E1w&s",
    },
    {
      id: 7,
      name: "Product 3",
      price: 4000,
      description: "Sample product description 3",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRDjE3XpksomexIA_D9iPHoBdZUii_RCjOBg&s",
    },
    {
      id: 8,
      name: "Product 4",
      price: 4000,
      description: "Sample product description 4",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6MFpW5mXueKwEI1vf5uUSN8UpVohOU1sDJw&s",
    },
    {
      id: 9,
      name: "Product 3",
      price: 4000,
      description: "Sample product description 3",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRDjE3XpksomexIA_D9iPHoBdZUii_RCjOBg&s",
    },
    {
      id: 10,
      name: "Product 4",
      price: 4000,
      description: "Sample product description 4",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6MFpW5mXueKwEI1vf5uUSN8UpVohOU1sDJw&s",
    },
  ];
  return (
    <div className="w-full mx-auto font-sans text-[#2C3E50]">
      {/* Store Banner Image */}
      <Banner />

      <StatusCard />

      <main className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Store Details Card */}
        <Card className="mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-xl md:text-2xl text-[#2C3E50]">
                Store Details
              </h2>
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
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Store;