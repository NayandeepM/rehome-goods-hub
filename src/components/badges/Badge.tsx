
import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
  children?: React.ReactNode;
}

const Badge = ({
  variant = "default",
  className,
  children,
}: BadgeProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "default":
        return "bg-rehome-green-500 text-white hover:bg-rehome-green-600";
      case "secondary":
        return "bg-rehome-neutral-200 text-rehome-neutral-900 hover:bg-rehome-neutral-300";
      case "destructive":
        return "bg-red-500 text-white hover:bg-red-600";
      case "outline":
        return "border border-rehome-neutral-300 text-rehome-neutral-700 hover:bg-rehome-neutral-100 hover:text-rehome-neutral-900";
      default:
        return "bg-rehome-green-500 text-white hover:bg-rehome-green-600";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        getVariantStyles(),
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
