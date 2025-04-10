
import { useState } from "react";
import { mockProducts } from "../data/mockProducts";

export const useBrowseProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleConditionChange = (condition: string) => {
    setSelectedConditions(prev => {
      if (prev.includes(condition)) {
        return prev.filter(c => c !== condition);
      } else {
        return [...prev, condition];
      }
    });
  };

  const filteredProducts = mockProducts.filter(product => {
    // Search filter
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(product.category);
    
    // Condition filter
    const matchesCondition = selectedConditions.length === 0 || 
      selectedConditions.includes(product.condition);
    
    // Price filter
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesCondition && matchesPrice;
  });

  return {
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    selectedCategories,
    setSelectedCategories,
    selectedConditions,
    setSelectedConditions,
    isFilterOpen,
    setIsFilterOpen,
    handleCategoryChange,
    handleConditionChange,
    filteredProducts
  };
};
