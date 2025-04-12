
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { getProducts } from "@/services/productService";
import { Loader2 } from "lucide-react";

const FeaturedSection = () => {
  const [visibleProducts, setVisibleProducts] = useState(4);
  
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: getProducts
  });

  const showMoreProducts = () => {
    if (products) {
      setVisibleProducts(Math.min(visibleProducts + 4, products.length));
    }
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
          <Link to="/products" className="mt-4 sm:mt-0">
            <Button variant="link" className="text-rehome-green-600 p-0">
              View all products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-rehome-green-500" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">Error loading products. Please try again later.</p>
          </div>
        ) : products && products.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, visibleProducts).map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.images ? product.images[0] : "/placeholder.svg"}
                seller="ReHome Seller"
                location={product.location || "Unknown"}
                condition={product.condition}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p>No featured products available.</p>
          </div>
        )}
        
        {products && visibleProducts < products.length && (
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
