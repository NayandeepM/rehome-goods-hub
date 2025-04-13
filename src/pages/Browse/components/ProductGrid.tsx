
import React from "react";
import ProductCard from "./ProductCard";
import { usePagination } from "@/hooks/usePagination";
import PaginationControls from "@/components/PaginationControls";
import { Loader2 } from "lucide-react";

interface ProductGridProps {
  filteredProducts: {
    id: string;
    title: string;
    price: number;
    category: string;
    condition: string;
    image: string;
  }[];
  isLoading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ filteredProducts, isLoading = false }) => {
  const {
    currentItems,
    currentPage,
    totalPages,
    goToPage
  } = usePagination({
    items: filteredProducts,
    itemsPerPage: 12
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-rehome-green-500" />
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
        <p className="text-gray-500">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} found
        </p>
      </div>
      
      {filteredProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentItems.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-8">
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
              className="justify-center"
            />
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No items found</h3>
          <p className="text-gray-500">Try adjusting your filters or search terms</p>
        </div>
      )}
    </>
  );
};

export default ProductGrid;
