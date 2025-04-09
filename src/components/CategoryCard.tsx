
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  name: string;
  image: string;
  count: number;
  slug: string;
  className?: string;
}

const CategoryCard = ({ name, image, count, slug, className }: CategoryCardProps) => {
  return (
    <Link to={`/category/${slug}`} className={cn("group block", className)}>
      <div className="relative overflow-hidden rounded-lg">
        <div className="aspect-square w-full overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 w-full p-4 text-white">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm opacity-90">{count} items</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
