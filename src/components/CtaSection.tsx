
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-rehome-green-600 px-6 py-10 shadow-xl sm:px-12 sm:py-16">
          <div className="relative lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to sell your unused items?
              </h2>
              <p className="mt-4 text-lg text-rehome-green-100">
                Join thousands of sellers who are turning their unused items into cash. 
                It's easy, sustainable, and free to start selling on ReHome!
              </p>
              <div className="mt-8">
                <Link to="/sell">
                  <Button size="lg" className="bg-white text-rehome-green-600 hover:bg-rehome-green-50">
                    Start Selling Now
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="mt-12 lg:col-span-1 lg:mt-0">
              <dl className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white bg-opacity-20 text-white">
                      <span className="text-xl font-bold">1</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg font-medium text-white">Free to list</dt>
                    <dd className="mt-1 text-rehome-green-100">
                      Create listings for free with multiple photos
                    </dd>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white bg-opacity-20 text-white">
                      <span className="text-xl font-bold">2</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg font-medium text-white">Secure payments</dt>
                    <dd className="mt-1 text-rehome-green-100">
                      Receive payments safely through our platform
                    </dd>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white bg-opacity-20 text-white">
                      <span className="text-xl font-bold">3</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg font-medium text-white">Supportive community</dt>
                    <dd className="mt-1 text-rehome-green-100">
                      Connect with a community that values sustainability
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
