
import React from "react";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { categories, conditions } from "../data/mockProducts";

interface FiltersSidebarProps {
  categories: string[];
  conditions: string[];
  selectedCategories: string[];
  selectedConditions: string[];
  priceRange: number[];
  handleCategoryChange: (category: string) => void;
  handleConditionChange: (condition: string) => void;
  setPriceRange: React.Dispatch<React.SetStateAction<number[]>>;
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedConditions: React.Dispatch<React.SetStateAction<string[]>>;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  categories,
  conditions,
  selectedCategories,
  selectedConditions,
  priceRange,
  handleCategoryChange,
  handleConditionChange,
  setPriceRange,
  setSelectedCategories,
  setSelectedConditions
}) => {
  return (
    <>
      <h3 className="font-semibold text-lg mb-4">Filters</h3>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="px-2">
          <Slider 
            defaultValue={[0, 500]} 
            max={500} 
            step={10} 
            value={priceRange}
            onValueChange={(value) => setPriceRange(value)}
            className="mb-4"
          />
          <div className="flex justify-between">
            <span className="text-sm">${priceRange[0]}</span>
            <span className="text-sm">${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <Collapsible defaultOpen className="mb-6">
        <CollapsibleTrigger className="flex w-full items-center justify-between font-medium mb-3">
          <span>Categories</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox 
                  id={`category-${category}`} 
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <label 
                  htmlFor={`category-${category}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Conditions */}
      <Collapsible defaultOpen className="mb-6">
        <CollapsibleTrigger className="flex w-full items-center justify-between font-medium mb-3">
          <span>Condition</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-2">
            {conditions.map((condition) => (
              <div key={condition} className="flex items-center space-x-2">
                <Checkbox 
                  id={`condition-${condition}`} 
                  checked={selectedConditions.includes(condition)}
                  onCheckedChange={() => handleConditionChange(condition)}
                />
                <label 
                  htmlFor={`condition-${condition}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {condition}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Button variant="outline" className="w-full" onClick={() => {
        setPriceRange([0, 500]);
        setSelectedCategories([]);
        setSelectedConditions([]);
      }}>
        Reset Filters
      </Button>
    </>
  );
};

export default FiltersSidebar;
