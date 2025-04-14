
import React from "react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    price: number;
    category: string;
    condition: string;
    image: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg truncate" title={product.title}>
          {product.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 py-2 flex-grow">
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="text-sm text-gray-500">{product.condition}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="font-semibold">${product.price.toFixed(2)}</p>
        <Link to={`/product/${product.id}`}>
          <Button size="sm">View Item</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
