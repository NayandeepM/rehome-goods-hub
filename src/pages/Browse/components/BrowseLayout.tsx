
import React from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import FiltersSidebar from "./FiltersSidebar";
import ProductGrid from "./ProductGrid";
import { categories, conditions } from "../data/mockProducts";

interface BrowseLayoutProps {
  filteredProducts: {
    id: string;
    title: string;
    price: number;
    category: string;
    condition: string;
    image: string;
  }[];
  priceRange: number[];
  setPriceRange: React.Dispatch<React.SetStateAction<number[]>>;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedConditions: string[];
  setSelectedConditions: React.Dispatch<React.SetStateAction<string[]>>;
  handleCategoryChange: (category: string) => void;
  handleConditionChange: (condition: string) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading?: boolean;
}

const BrowseLayout: React.FC<BrowseLayoutProps> = ({
  filteredProducts,
  priceRange,
  setPriceRange,
  selectedCategories,
  setSelectedCategories,
  selectedConditions,
  setSelectedConditions,
  handleCategoryChange,
  handleConditionChange,
  isFilterOpen,
  setIsFilterOpen,
  isLoading = false
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Mobile filter toggle */}
        <div className="md:hidden w-full mb-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-between"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <span className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </span>
            <span className={`transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </Button>
          
          {isFilterOpen && (
            <div className="mt-4 border rounded-lg p-4 bg-white">
              {/* Mobile filters content */}
              <FiltersSidebar 
                categories={categories.slice(1)}
                conditions={conditions.slice(1)}
                selectedCategories={selectedCategories}
                selectedConditions={selectedConditions}
                priceRange={priceRange}
                handleCategoryChange={handleCategoryChange}
                handleConditionChange={handleConditionChange}
                setPriceRange={setPriceRange}
                setSelectedCategories={setSelectedCategories}
                setSelectedConditions={setSelectedConditions}
              />
            </div>
          )}
        </div>
        
        {/* Desktop sidebar */}
        <div className="hidden md:block w-full md:w-1/4 lg:w-1/5">
          <div className="sticky top-8 border rounded-lg p-4 bg-white">
            <FiltersSidebar 
              categories={categories.slice(1)}
              conditions={conditions.slice(1)}
              selectedCategories={selectedCategories}
              selectedConditions={selectedConditions}
              priceRange={priceRange}
              handleCategoryChange={handleCategoryChange}
              handleConditionChange={handleConditionChange}
              setPriceRange={setPriceRange}
              setSelectedCategories={setSelectedCategories}
              setSelectedConditions={setSelectedConditions}
            />
          </div>
        </div>
        
        {/* Products grid */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          <ProductGrid 
            filteredProducts={filteredProducts} 
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default BrowseLayout;
