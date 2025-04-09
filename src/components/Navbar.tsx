
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Menu,
  X,
  ShoppingBag,
  Heart,
  User,
  PlusCircle
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-rehome-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-rehome-green-600 text-xl font-bold">
                ReHome
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/browse"
                className="text-rehome-neutral-600 hover:text-rehome-green-600 px-3 py-2 text-sm font-medium"
              >
                Browse
              </Link>
              <Link
                to="/categories"
                className="text-rehome-neutral-600 hover:text-rehome-green-600 px-3 py-2 text-sm font-medium"
              >
                Categories
              </Link>
              <Link
                to="/how-it-works"
                className="text-rehome-neutral-600 hover:text-rehome-green-600 px-3 py-2 text-sm font-medium"
              >
                How It Works
              </Link>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-rehome-neutral-400" />
                </div>
                <Input
                  className="block w-full pl-10 pr-3 py-2 border border-rehome-neutral-300 rounded-md"
                  placeholder="Search for items..."
                  type="search"
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="hidden md:flex items-center">
            <Button variant="ghost" size="icon" className="ml-4">
              <Heart className="h-5 w-5 text-rehome-neutral-600" />
            </Button>
            <Button variant="ghost" size="icon" className="ml-4">
              <ShoppingBag className="h-5 w-5 text-rehome-neutral-600" />
            </Button>
            <Link to="/login">
              <Button variant="ghost" size="icon" className="ml-4">
                <User className="h-5 w-5 text-rehome-neutral-600" />
              </Button>
            </Link>
            <Link to="/sell">
              <Button className="ml-4 bg-rehome-green-500 hover:bg-rehome-green-600">
                <PlusCircle className="h-5 w-5 mr-2" />
                Sell Item
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="inline-flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu, toggle based on menu state */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/browse"
              className="text-rehome-neutral-600 hover:text-rehome-green-600 block px-3 py-2 text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Browse
            </Link>
            <Link
              to="/categories"
              className="text-rehome-neutral-600 hover:text-rehome-green-600 block px-3 py-2 text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Categories
            </Link>
            <Link
              to="/how-it-works"
              className="text-rehome-neutral-600 hover:text-rehome-green-600 block px-3 py-2 text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
            <Link
              to="/login"
              className="text-rehome-neutral-600 hover:text-rehome-green-600 block px-3 py-2 text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Login / Register
            </Link>
            <Link
              to="/sell"
              className="text-rehome-green-600 hover:bg-rehome-green-100 block px-3 py-2 text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Sell Item
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
