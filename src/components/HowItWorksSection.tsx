
import { Package, DollarSign, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorksSection = () => {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-rehome-neutral-900 sm:text-3xl lg:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-rehome-neutral-600">
            ReHome makes buying and selling second-hand goods simple, secure, and sustainable
          </p>
        </div>
        
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rehome-green-100">
              <Package className="h-8 w-8 text-rehome-green-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-rehome-neutral-900">List Your Items</h3>
            <p className="text-rehome-neutral-600">
              Take a few photos, add details about your item, and set your price. 
              Create your listing in just a few minutes.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rehome-green-100">
              <ShoppingBag className="h-8 w-8 text-rehome-green-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-rehome-neutral-900">Connect & Sell</h3>
            <p className="text-rehome-neutral-600">
              Interested buyers will contact you. Arrange a meetup for local sales or 
              use our secure shipping options for distant buyers.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rehome-green-100">
              <DollarSign className="h-8 w-8 text-rehome-green-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-rehome-neutral-900">Get Paid Securely</h3>
            <p className="text-rehome-neutral-600">
              Receive payments through our secure platform. Funds are transferred once the 
              buyer confirms receipt of the item.
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/how-it-works">
            <Button variant="outline" className="border-rehome-green-500 text-rehome-green-600 hover:bg-rehome-green-50">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
