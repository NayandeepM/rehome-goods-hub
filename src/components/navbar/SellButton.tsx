
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const SellButton = () => {
  return (
    <Link to="/sell">
      <Button className="bg-rehome-green-600 hover:bg-rehome-green-700 flex items-center gap-1">
        <Plus className="h-4 w-4" />
        <span>Sell an Item</span>
      </Button>
    </Link>
  );
};

export default SellButton;
