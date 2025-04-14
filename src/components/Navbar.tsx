
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import SearchDialog from "./SearchDialog";
import Cart from "./Cart";
import DesktopNav from "./navbar/DesktopNav";
import UserMenu from "./navbar/UserMenu";
import SellButton from "./navbar/SellButton";
import MobileMenu from "./navbar/MobileMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuth();
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
            <DesktopNav />
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <SearchDialog />
            <Cart />
            <UserMenu handleSignOut={handleSignOut} />
            <SellButton />
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
      <MobileMenu 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        handleSignOut={handleSignOut} 
      />
    </nav>
  );
};

export default Navbar;
