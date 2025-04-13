
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import BrowseLayout from "./components/BrowseLayout";
import { useBrowseProducts } from "./hooks/useBrowseProducts";

const Browse = () => {
  const {
    searchQuery,
    setSearchQuery,
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
    isLoading
  } = useBrowseProducts();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-slate-100 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Browse Items</h1>
            <p className="text-gray-600 text-lg mb-6">Find exactly what you're looking for from thousands of listings</p>
            
            {/* Search bar */}
            <div className="relative max-w-2xl">
              <Input
                type="text"
                placeholder="Search for items..."
                className="pl-10 pr-4 py-3 w-full rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </div>
        
        <BrowseLayout 
          filteredProducts={filteredProducts}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedConditions={selectedConditions}
          setSelectedConditions={setSelectedConditions}
          handleCategoryChange={handleCategoryChange}
          handleConditionChange={handleConditionChange}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          isLoading={isLoading}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Browse;
