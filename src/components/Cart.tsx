
import { useState } from "react";
import { X, Minus, Plus, ShoppingCart as CartIcon } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

export function Cart() {
  const [open, setOpen] = useState(false);
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  
  const handleCheckout = () => {
    // For now, just clear the cart
    clearCart();
    setOpen(false);
  };
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <CartIcon className="h-5 w-5 text-rehome-neutral-600" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-rehome-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-rehome-green-700">Your Cart</SheetTitle>
        </SheetHeader>
        
        <div className="flex-grow overflow-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-rehome-neutral-500">
              <CartIcon className="h-12 w-12 mb-2 opacity-50" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li 
                  key={item.id} 
                  className="flex items-center gap-4 py-3 border-b border-rehome-neutral-200"
                >
                  <div className="h-16 w-16 rounded bg-rehome-neutral-100 flex-shrink-0 overflow-hidden">
                    <img 
                      src={item.image || "/placeholder.svg"} 
                      alt={item.title} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <h4 className="font-medium text-rehome-neutral-900 truncate">{item.title}</h4>
                    <p className="text-rehome-green-600 font-medium">${item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-full p-0"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    
                    <span className="w-6 text-center">{item.quantity}</span>
                    
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-full p-0"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-rehome-neutral-500"
                    onClick={() => removeItem(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {items.length > 0 && (
          <SheetFooter className={cn("flex-col space-y-4 border-t border-rehome-neutral-200 pt-4")}>
            <div className="space-y-2 w-full">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold text-rehome-neutral-900">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="grid gap-2 w-full">
              <Button
                className="w-full bg-rehome-green-600 hover:bg-rehome-green-700"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default Cart;
