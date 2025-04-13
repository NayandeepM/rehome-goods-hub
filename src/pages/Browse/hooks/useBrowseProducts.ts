
import { useState, useEffect, useMemo } from "react";
import { mockProducts } from "../data/mockProducts";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/productService";

export const useBrowseProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch products from API with fallback to mock data
  const { data: products, isLoading } = useQuery({
    queryKey: ["browse-products"],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Use the fetched products or fall back to mock products
  const productsData = useMemo(() => products || mockProducts, [products]);

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

  // Memoize filtered products to avoid recalculation on each render
  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
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
  }, [productsData, searchQuery, selectedCategories, selectedConditions, priceRange]);

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
    filteredProducts,
    isLoading
  };
};
