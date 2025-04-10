
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock data for the example
const mockProducts = [
  {
    id: "1",
    title: "Vintage Leather Jacket",
    price: 89.99,
    category: "Clothing",
    condition: "Used - Good",
    image: "/placeholder.svg"
  },
  {
    id: "2",
    title: "Wireless Headphones",
    price: 59.99,
    category: "Electronics",
    condition: "Used - Like New",
    image: "/placeholder.svg"
  },
  {
    id: "3",
    title: "Antique Coffee Table",
    price: 120.00,
    category: "Furniture",
    condition: "Used - Fair",
    image: "/placeholder.svg"
  },
  {
    id: "4",
    title: "Mountain Bike",
    price: 210.50,
    category: "Sports",
    condition: "Used - Good",
    image: "/placeholder.svg"
  },
  {
    id: "5",
    title: "Classic Novel Collection",
    price: 45.00,
    category: "Books",
    condition: "Used - Good",
    image: "/placeholder.svg"
  },
  {
    id: "6",
    title: "DSLR Camera",
    price: 350.00,
    category: "Electronics",
    condition: "Used - Like New",
    image: "/placeholder.svg"
  },
];

const categories = [
  "All Categories",
  "Electronics",
  "Clothing",
  "Furniture",
  "Books",
  "Sports",
  "Collectibles",
  "Toys",
  "Home & Garden"
];

const conditions = [
  "All Conditions",
  "New",
  "Used - Like New",
  "Used - Good",
  "Used - Fair",
  "Used - Poor"
];

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
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
                <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </Button>
              
              {isFilterOpen && (
                <div className="mt-4 border rounded-lg p-4 bg-white">
                  {/* Mobile filters content */}
                  <FiltersSidebar 
                    categories={categories}
                    conditions={conditions}
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
                  categories={categories}
                  conditions={conditions}
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
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// ProductCard component
const ProductCard = ({ product }: { product: any }) => {
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
        <Button size="sm">View Item</Button>
      </CardFooter>
    </Card>
  );
};

// FiltersSidebar component
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

const FiltersSidebar = ({
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
}: FiltersSidebarProps) => {
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
            {categories.slice(1).map((category) => (
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
            {conditions.slice(1).map((condition) => (
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

export default Browse;
