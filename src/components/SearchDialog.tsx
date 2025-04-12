
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getProducts } from "@/services/productService";
import { Product } from "@/types/database.types";

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    enabled: open, // Only fetch when dialog is open
    staleTime: 60 * 1000 // Cache for 1 minute
  });
  
  const filteredProducts = products?.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleProductClick = (productId: string) => {
    setOpen(false);
    // For now, navigate to products page since we don't have individual product pages yet
    navigate(`/products`);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <SearchIcon className="h-5 w-5 text-rehome-neutral-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <div className="space-y-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-rehome-neutral-500" />
            <Input
              placeholder="Search for products, categories, etc..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
          
          <div className="max-h-72 overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-rehome-green-600" />
              </div>
            ) : searchQuery.length > 0 && filteredProducts && filteredProducts.length > 0 ? (
              <ul className="space-y-2">
                {filteredProducts.map((product) => (
                  <li 
                    key={product.id}
                    className="flex items-center gap-3 p-2 hover:bg-rehome-neutral-100 rounded cursor-pointer"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <div className="h-12 w-12 rounded bg-rehome-neutral-100 overflow-hidden">
                      <img 
                        src={(product.images && product.images.length > 0) ? product.images[0] : "/placeholder.svg"}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-rehome-neutral-900">{product.title}</h4>
                      <p className="text-sm text-rehome-neutral-500">{product.category}</p>
                    </div>
                    <div className="ml-auto">
                      <span className="font-medium text-rehome-green-600">${product.price.toFixed(2)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : searchQuery.length > 0 ? (
              <div className="text-center py-8 text-rehome-neutral-500">
                <p>No products found for "{searchQuery}"</p>
              </div>
            ) : null}
          </div>
          
          {searchQuery.length > 0 && filteredProducts && filteredProducts.length > 0 && (
            <div className="text-center">
              <Button
                variant="link"
                className="text-rehome-green-600"
                onClick={() => {
                  setOpen(false);
                  navigate("/products");
                }}
              >
                See all products
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SearchDialog;
