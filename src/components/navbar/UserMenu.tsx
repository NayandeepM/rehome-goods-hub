
import { Link } from "react-router-dom";
import { LogOut, ShoppingCart, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

interface UserMenuProps {
  handleSignOut: () => Promise<void>;
}

const UserMenu = ({ handleSignOut }: UserMenuProps) => {
  const { user } = useAuth();

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <div className="h-8 w-8 rounded-full bg-rehome-green-100 flex items-center justify-center text-rehome-green-700 font-medium">
              {user.user_metadata?.first_name ? user.user_metadata.first_name[0] : user.email?.[0].toUpperCase()}
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled>
            <span className="text-rehome-neutral-500">
              {user.user_metadata?.first_name 
                ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ''}`
                : user.email}
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to="/seller-dashboard" className="w-full flex items-center">
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span>My listings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    return (
      <Link to="/login">
        <Button variant="ghost" className="flex items-center gap-1">
          <LogIn className="h-4 w-4" />
          <span>Login</span>
        </Button>
      </Link>
    );
  }
};

export default UserMenu;
