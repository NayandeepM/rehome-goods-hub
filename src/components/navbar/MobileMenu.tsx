
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSignOut: () => Promise<void>;
}

const MobileMenu = ({ isOpen, setIsOpen, handleSignOut }: MobileMenuProps) => {
  const { user } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="sm:hidden block pt-2 pb-3 space-y-1">
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
  );
};

export default MobileMenu;
