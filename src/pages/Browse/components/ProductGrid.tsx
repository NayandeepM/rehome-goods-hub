
import React from "react";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  filteredProducts: {
    id: string;
    title: string;
    price: number;
    category: string;
    condition: string;
    image: string;
  }[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ filteredProducts }) => {
  return (
    <>
      <div className="mb-4">
        <p className="text-gray-500">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} found
        </p>
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
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
