
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Browse from "./pages/Browse";
import ProductsPage from "./pages/ProductsPage";
import PlaceholderPage from "./components/PlaceholderPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/categories" element={<PlaceholderPage title="Categories" />} />
            <Route path="/how-it-works" element={<PlaceholderPage title="How It Works" />} />
            <Route path="/login" element={<PlaceholderPage title="Login / Register" />} />
            <Route path="/sell" element={<PlaceholderPage title="Sell an Item" />} />
            <Route path="/featured" element={<PlaceholderPage title="Featured Items" />} />
            <Route path="/deals" element={<PlaceholderPage title="Deals" />} />
            <Route path="/seller-tips" element={<PlaceholderPage title="Seller Tips" />} />
            <Route path="/seller-dashboard" element={<PlaceholderPage title="Seller Dashboard" />} />
            <Route path="/shipping" element={<PlaceholderPage title="Shipping Options" />} />
            <Route path="/faq" element={<PlaceholderPage title="FAQ" />} />
            <Route path="/contact" element={<PlaceholderPage title="Contact Us" />} />
            <Route path="/terms" element={<PlaceholderPage title="Terms of Service" />} />
            <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
