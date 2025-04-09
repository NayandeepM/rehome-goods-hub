
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";

// Sample data (in a real app, this would come from an API)
const FEATURED_PRODUCTS = [
  {
    id: "1",
    title: "Vintage Leather Jacket",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    seller: "VintageLover",
    location: "San Francisco",
    condition: "Good"
  },
  {
    id: "2",
    title: "Retro Record Player",
    price: 120.00,
    image: "https://images.unsplash.com/photo-1462965326201-d02e4f455804?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    seller: "MusicCollector",
    location: "Chicago",
    condition: "Like New",
    isNew: true
  },
  {
    id: "3",
    title: "Handcrafted Ceramic Vase",
    price: 35.50,
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    seller: "ArtisanCrafts",
    location: "Portland",
    condition: "New"
  },
  {
    id: "4",
    title: "Vintage Film Camera",
    price: 67.25,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    seller: "RetroFinds",
    location: "New York",
    condition: "Good"
  },
  {
    id: "5",
    title: "Antique Wooden Chair",
    price: 145.00,
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    seller: "VintageFurniture",
    location: "Boston",
    condition: "Fair"
  },
  {
    id: "6",
    title: "Designer Handbag",
    price: 220.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    seller: "FashionReseller",
    location: "Miami",
    condition: "Excellent",
    isNew: true
  },
  {
    id: "7",
    title: "Mechanical Watch",
    price: 175.50,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    seller: "TimeKeeper",
    location: "Seattle",
    condition: "Good"
  },
  {
    id: "8",
    title: "Vintage Bicycle",
    price: 199.00,
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    seller: "CyclingEnthusiast",
    location: "Denver",
    condition: "Good"
  }
];

const FeaturedSection = () => {
  const [visibleProducts, setVisibleProducts] = useState(4);

  const showMoreProducts = () => {
    setVisibleProducts(Math.min(visibleProducts + 4, FEATURED_PRODUCTS.length));
  };

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-rehome-neutral-900 sm:text-3xl">
              Featured Items
            </h2>
            <p className="mt-2 text-rehome-neutral-600">
              Discover unique treasures hand-picked by our team
            </p>
          </div>
          <Link to="/featured" className="mt-4 sm:mt-0">
            <Button variant="link" className="text-rehome-green-600 p-0">
              View all featured items
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_PRODUCTS.slice(0, visibleProducts).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        {visibleProducts < FEATURED_PRODUCTS.length && (
          <div className="mt-8 text-center">
            <Button 
              variant="outline" 
              onClick={showMoreProducts}
              className="border-rehome-green-500 text-rehome-green-600 hover:bg-rehome-green-50"
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedSection;
