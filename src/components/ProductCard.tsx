
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  seller: string;
  location: string;
  condition: string;
  isNew?: boolean;
  className?: string;
}

const ProductCard = ({
  id,
  title,
  price,
  image,
  seller,
  location,
  condition,
  isNew = false,
  className,
}: ProductCardProps) => {
  return (
    <div className={cn("group relative overflow-hidden rounded-lg border border-rehome-neutral-200 bg-white transition-all hover:shadow-md", className)}>
      <Link to={`/product/${id}`} className="block aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      
      {isNew && (
        <div className="absolute top-2 left-2">
          <Badge className="bg-rehome-green-500 hover:bg-rehome-green-600">New</Badge>
        </div>
      )}
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-2 right-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
      >
        <Heart className="h-5 w-5 text-rehome-neutral-600" />
      </Button>
      
      <div className="p-4">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm text-rehome-neutral-500">{seller}</span>
          <Badge variant="outline" className="text-xs">
            {condition}
          </Badge>
        </div>
        
        <Link to={`/product/${id}`}>
          <h3 className="text-base font-medium text-rehome-neutral-900 line-clamp-1 group-hover:text-rehome-green-600">
            {title}
          </h3>
        </Link>
        
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-semibold text-rehome-neutral-900">
            ${price.toFixed(2)}
          </span>
          <span className="text-xs text-rehome-neutral-500">{location}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
