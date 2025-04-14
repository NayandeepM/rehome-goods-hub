
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/services/productService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => id ? getProductById(id) : null,
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      toast({
        title: "Added to cart",
        description: `${product.title} has been added to your cart.`,
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Link to="/products" className="flex items-center text-rehome-green-600 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-rehome-green-500" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-red-500">Error</h2>
            <p className="mt-2">Unable to load product details. Please try again later.</p>
          </div>
        ) : !product ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold">Product Not Found</h2>
            <p className="mt-2">The product you're looking for doesn't exist or has been removed.</p>
            <Link to="/products">
              <Button className="mt-4">Browse All Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="bg-rehome-neutral-100 rounded-lg overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <img 
                  src={product.images[0]} 
                  alt={product.title} 
                  className="w-full h-auto object-cover"
                />
              ) : (
                <img 
                  src="/placeholder.svg" 
                  alt={product.title} 
                  className="w-full h-auto object-contain p-4"
                />
              )}
            </div>
            
            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-bold text-rehome-neutral-900">{product.title}</h1>
              <p className="text-2xl font-semibold text-rehome-green-600 mt-2">
                ${product.price.toFixed(2)}
              </p>
              
              <div className="flex gap-4 mt-4">
                <div className="bg-rehome-neutral-100 px-3 py-1 rounded-full text-sm">
                  {product.condition}
                </div>
                <div className="bg-rehome-neutral-100 px-3 py-1 rounded-full text-sm">
                  {product.category}
                </div>
              </div>
              
              {product.location && (
                <p className="text-rehome-neutral-600 mt-4">
                  Location: {product.location}
                </p>
              )}
              
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-rehome-neutral-700">
                  {product.description || "No description provided."}
                </p>
              </div>
              
              <div className="mt-8">
                <Button 
                  onClick={handleAddToCart}
                  className="w-full md:w-auto bg-rehome-green-600 hover:bg-rehome-green-700"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
