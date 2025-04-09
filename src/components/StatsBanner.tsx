
import { Users, ShoppingBag, Truck, Leaf } from "lucide-react";

const stats = [
  {
    id: 1,
    label: "Active Users",
    value: "50,000+",
    icon: Users
  },
  {
    id: 2,
    label: "Items Sold",
    value: "250,000+",
    icon: ShoppingBag
  },
  {
    id: 3,
    label: "Local Pickups",
    value: "120,000+",
    icon: Truck
  },
  {
    id: 4,
    label: "CO₂ Saved (kg)",
    value: "500,000+",
    icon: Leaf
  }
];

const StatsBanner = () => {
  return (
    <section className="bg-rehome-green-600 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white bg-opacity-20">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <p className="mt-3 text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-sm font-medium text-rehome-green-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBanner;
