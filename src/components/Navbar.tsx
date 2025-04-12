
import { useState } from "react";
import { Menu, X, Search, ShoppingCart, LogOut, LogIn, UserPlus, Plus, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import SearchDialog from "./SearchDialog";
import Cart from "./Cart";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
      });
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: "An error occurred while signing out.",
      });
    }
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
            <SearchDialog />
            <Cart />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <div className="h-8 w-8 rounded-full bg-rehome-green-100 flex items-center justify-center text-rehome-green-700 font-medium">
                      {user.user_metadata?.first_name ? user.user_metadata.first_name[0] : user.email?.[0].toUpperCase()}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>
                    <span className="text-rehome-neutral-500">
                      {user.user_metadata?.first_name 
                        ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ''}`
                        : user.email}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/seller-dashboard" className="w-full flex items-center">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      <span>My listings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="ghost" className="flex items-center gap-1">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </Link>
            )}
            
            <Link to="/sell">
              <Button className="bg-rehome-green-600 hover:bg-rehome-green-700 flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>Sell an Item</span>
              </Button>
            </Link>
          </div>
          <div className="flex items-center sm:hidden">
            <SearchDialog />
            <Cart />
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
          
          {user ? (
            <>
              <Link
                to="/seller-dashboard"
                className="block pl-3 pr-4 py-2 text-base font-medium text-rehome-neutral-600 hover:bg-rehome-neutral-100"
                onClick={() => setIsOpen(false)}
              >
                My Listings
              </Link>
              <button
                className="w-full text-left block pl-3 pr-4 py-2 text-base font-medium text-rehome-neutral-600 hover:bg-rehome-neutral-100"
                onClick={() => {
                  handleSignOut();
                  setIsOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block pl-3 pr-4 py-2 text-base font-medium text-rehome-neutral-600 hover:bg-rehome-neutral-100"
              onClick={() => setIsOpen(false)}
            >
              Login / Register
            </Link>
          )}
          
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
