
import { useState } from "react";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const isMobile = useMobile();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-rehome-neutral-50 border-b border-rehome-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-rehome-green-700">ReHome</span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link
                to="/browse"
                className="text-rehome-neutral-600 hover:text-rehome-green-600 px-3 py-2 text-sm font-medium"
              >
                Browse
              </Link>
              <Link
                to="/products"
                className="text-rehome-neutral-600 hover:text-rehome-green-600 px-3 py-2 text-sm font-medium"
              >
                Products
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
          <div className="hidden sm:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5 text-rehome-neutral-600" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5 text-rehome-neutral-600" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5 text-rehome-neutral-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to="/login" className="w-full">Login / Register</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/seller-dashboard" className="w-full">Seller Dashboard</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/sell">
              <Button className="bg-rehome-green-600 hover:bg-rehome-green-700">
                Sell an Item
              </Button>
            </Link>
          </div>
          <div className="flex items-center sm:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isOpen ? (
                <X className="h-6 w-6 text-rehome-neutral-600" />
              ) : (
                <Menu className="h-6 w-6 text-rehome-neutral-600" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={cn("sm:hidden", isOpen ? "block" : "hidden")}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/browse"
            className="block pl-3 pr-4 py-2 text-base font-medium text-rehome-neutral-600 hover:bg-rehome-neutral-100"
            onClick={() => setIsOpen(false)}
          >
            Browse
          </Link>
          <Link
            to="/products"
            className="block pl-3 pr-4 py-2 text-base font-medium text-rehome-neutral-600 hover:bg-rehome-neutral-100"
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/categories"
            className="block pl-3 pr-4 py-2 text-base font-medium text-rehome-neutral-600 hover:bg-rehome-neutral-100"
            onClick={() => setIsOpen(false)}
          >
            Categories
          </Link>
          <Link
            to="/how-it-works"
            className="block pl-3 pr-4 py-2 text-base font-medium text-rehome-neutral-600 hover:bg-rehome-neutral-100"
            onClick={() => setIsOpen(false)}
          >
            How It Works
          </Link>
          <Link
            to="/login"
            className="block pl-3 pr-4 py-2 text-base font-medium text-rehome-neutral-600 hover:bg-rehome-neutral-100"
            onClick={() => setIsOpen(false)}
          >
            Login / Register
          </Link>
          <Link
            to="/sell"
            className="block pl-3 pr-4 py-2 text-base font-medium bg-rehome-green-600 text-white hover:bg-rehome-green-700"
            onClick={() => setIsOpen(false)}
          >
            Sell an Item
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
