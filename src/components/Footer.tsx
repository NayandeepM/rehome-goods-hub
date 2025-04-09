
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-rehome-neutral-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-rehome-green-600 text-xl font-bold">
              ReHome
            </Link>
            <p className="mt-2 text-sm text-rehome-neutral-500">
              Give pre-loved items a second life. Buy and sell second-hand goods in a sustainable marketplace.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-rehome-neutral-500 hover:text-rehome-green-500">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-rehome-neutral-500 hover:text-rehome-green-500">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-rehome-neutral-500 hover:text-rehome-green-500">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-rehome-neutral-500 hover:text-rehome-green-500">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-rehome-neutral-900 tracking-wider uppercase">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/browse" className="text-sm text-rehome-neutral-600 hover:text-rehome-green-500">
                  Browse All
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-sm text-rehome-neutral-600 hover:text-rehome-green-500">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/featured" className="text-sm text-rehome-neutral-600 hover:text-rehome-green-500">
                  Featured Items
                </Link>
              </li>
              <li>
                <Link to="/deals" className="text-sm text-rehome-neutral-600 hover:text-rehome-green-500">
                  Deals
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-rehome-neutral-900 tracking-wider uppercase">Sell</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/sell" className="text-sm text-rehome-neutral-600 hover:text-rehome-green-500">
                  Start Selling
                </Link>
              </li>
              <li>
                <Link to="/seller-tips" className="text-sm text-rehome-neutral-600 hover:text-rehome-green-500">
                  Seller Tips
                </Link>
              </li>
              <li>
                <Link to="/seller-dashboard" className="text-sm text-rehome-neutral-600 hover:text-rehome-green-500">
                  Seller Dashboard
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-rehome-neutral-600 hover:text-rehome-green-500">
                  Shipping Options
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-rehome-neutral-900 tracking-wider uppercase">Help</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/faq" className="text-sm text-rehome-neutral-600 hover:text-rehome-green-500">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-rehome-neutral-600 hover:text-rehome-green-500">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-rehome-neutral-600 hover:text-rehome-green-500">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-rehome-neutral-600 hover:text-rehome-green-500">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-rehome-neutral-200 pt-8">
          <p className="text-sm text-rehome-neutral-500 text-center">
            &copy; {new Date().getFullYear()} ReHome. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
