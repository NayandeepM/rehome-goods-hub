
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";
import ProductCardEnhanced from "@/components/ProductCardEnhanced";
import { getProductsByCategory } from "@/services/productService";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Map slug to display name
const categoryDisplayNames: Record<string, string> = {
  "fashion": "Fashion",
  "electronics": "Electronics",
  "home-garden": "Home & Garden",
  "books-media": "Books & Media",
  "sports-outdoors": "Sports & Outdoors",
  "collectibles": "Collectibles"
};

// Map slug to category name in database
const categoryMappings: Record<string, string> = {
  "fashion": "Clothing",
  "electronics": "Electronics",
  "home-garden": "Furniture",
  "books-media": "Books",
  "sports-outdoors": "Sports",
  "collectibles": "Collectibles"
};

const CategoryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [visibleProducts, setVisibleProducts] = useState(8);
  
  const categoryName = slug ? categoryMappings[slug] || slug : "";
  const displayName = slug ? categoryDisplayNames[slug] || categoryName : "Category";
  
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products", "category", categoryName],
    queryFn: () => getProductsByCategory(categoryName),
    enabled: !!categoryName
  });

  const showMoreProducts = () => {
    if (products) {
      setVisibleProducts(Math.min(visibleProducts + 8, products.length));
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <h1 className="text-3xl font-bold tracking-tight text-rehome-neutral-900 sm:text-4xl">
                {displayName}
              </h1>
              <p className="mt-2 text-rehome-neutral-600">
                Browse all available items in this category
              </p>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-rehome-green-500" />
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-500">Error loading products. Please try again later.</p>
              </div>
            ) : products && products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {products.slice(0, visibleProducts).map((product) => (
                    <ProductCardEnhanced 
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
                
                {visibleProducts < (products?.length || 0) && (
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
              </>
            ) : (
              <div className="text-center py-20">
                <p>No products found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryDetail;
