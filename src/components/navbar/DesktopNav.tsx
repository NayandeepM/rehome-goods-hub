
import { Link } from "react-router-dom";

const DesktopNav = () => {
  return (
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
  );
};

export default DesktopNav;
