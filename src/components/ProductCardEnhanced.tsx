
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardEnhancedProps {
  product: Product;
}

export function ProductCardEnhanced({ product }: ProductCardEnhancedProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-rehome-neutral-200 bg-white hover:shadow-md transition-shadow duration-200">
      <div className="relative h-48 w-full bg-rehome-neutral-100">
        <img
          src={(product.images && product.images.length > 0) ? product.images[0] : "/placeholder.svg"}
          alt={product.title}
          className="h-full w-full object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
        >
          <Heart className="h-5 w-5 text-rehome-neutral-500 hover:text-rehome-red-500" />
        </Button>
      </div>
      <div className="p-4 space-y-2">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-medium text-rehome-neutral-900 line-clamp-1 hover:text-rehome-green-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        <div className="flex justify-between items-center">
          <span className="text-rehome-green-600 font-bold">${product.price.toFixed(2)}</span>
          <span className="text-sm text-rehome-neutral-500">{product.condition}</span>
        </div>
        <div className="text-sm text-rehome-neutral-500 flex items-center gap-1">
          <span>{product.location || "Unknown location"}</span>
        </div>
        <Button 
          className="w-full bg-rehome-green-600 hover:bg-rehome-green-700 mt-2"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductCardEnhanced;
