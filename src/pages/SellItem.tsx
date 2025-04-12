
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { createProduct } from "@/services/productService";
import { ProductInsert } from "@/types/database.types";
import { supabase } from "@/integrations/supabase/client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, Upload } from "lucide-react";

const sellItemSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  price: z.coerce.number().positive({ message: "Price must be a positive number" }),
  category: z.string().min(1, { message: "Please select a category" }),
  condition: z.string().min(1, { message: "Please select the condition" }),
  location: z.string().min(1, { message: "Location is required" }),
});

type SellItemFormValues = z.infer<typeof sellItemSchema>;

const categoryOptions = [
  "Furniture", 
  "Electronics", 
  "Clothing", 
  "Home Decor", 
  "Kitchen", 
  "Bathroom", 
  "Outdoor", 
  "Books", 
  "Sports", 
  "Other"
];

const conditionOptions = [
  "New", 
  "Used - Like New", 
  "Used - Good", 
  "Used - Fair", 
  "Used - Poor"
];

const SellItem = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Redirect to login if not authenticated
  if (!user) {
    navigate("/login");
    return null;
  }
  
  const form = useForm<SellItemFormValues>({
    resolver: zodResolver(sellItemSchema),
    defaultValues: {
      title: "",
      description: "",
      price: undefined,
      category: "",
      condition: "",
      location: "",
    },
  });
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      
      // Validate file types
      const validFiles = newFiles.filter(file => 
        file.type.startsWith('image/')
      );
      
      if (validFiles.length !== newFiles.length) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Only image files are allowed",
        });
      }
      
      // Limit to max 5 images
      const totalImages = [...images, ...validFiles];
      
      if (totalImages.length > 5) {
        toast({
          variant: "destructive",
          title: "Too many images",
          description: "You can upload a maximum of 5 images",
        });
        setImages(totalImages.slice(0, 5));
      } else {
        setImages(totalImages);
      }
    }
  };
  
  const removeImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };
  
  const uploadImages = async (): Promise<string[]> => {
    if (images.length === 0) return [];
    
    setUploading(true);
    const uploadedUrls: string[] = [];
    const increment = 100 / images.length;
    
    try {
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `product-images/${fileName}`;
        
        const { error, data } = await supabase.storage
          .from('products')
          .upload(filePath, file);
          
        if (error) {
          throw error;
        }
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('products')
          .getPublicUrl(filePath);
          
        uploadedUrls.push(publicUrl);
        setUploadProgress((i + 1) * increment);
      }
      
      return uploadedUrls;
    } catch (error) {
      console.error('Error uploading images:', error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "Failed to upload images. Please try again.",
      });
      return [];
    } finally {
      setUploading(false);
    }
  };
  
  const onSubmit = async (values: SellItemFormValues) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "You need to be logged in to sell items",
      });
      navigate("/login");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Upload images first
      const imageUrls = await uploadImages();
      
      // Create product
      const productData: ProductInsert = {
        title: values.title,
        description: values.description,
        price: values.price,
        category: values.category,
        condition: values.condition,
        location: values.location,
        seller_id: user.id,
        status: "available",
        images: imageUrls,
      };
      
      await createProduct(productData);
      
      toast({
        title: "Item listed successfully!",
        description: "Your item has been posted for sale.",
      });
      
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to list item",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-lg shadow-lg p-8 border border-rehome-neutral-200">
            <h1 className="text-2xl font-bold mb-6 text-rehome-green-700">
              Sell an Item
            </h1>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Vintage Dining Table" {...field} />
                      </FormControl>
                      <FormDescription>
                        What are you selling? Be specific and concise.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your item in detail. Include dimensions, materials, age, any flaws, etc."
                          className="min-h-24"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            placeholder="99.99"
                            step="0.01"
                            min="0"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="New York, NY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categoryOptions.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Condition</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {conditionOptions.map((condition) => (
                              <SelectItem key={condition} value={condition}>
                                {condition}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div>
                  <FormLabel>Images (Maximum 5)</FormLabel>
                  <div className="mt-2">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-rehome-neutral-300 border-dashed rounded-lg cursor-pointer bg-rehome-neutral-50 hover:bg-rehome-neutral-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-rehome-neutral-400" />
                          <p className="mb-2 text-sm text-rehome-neutral-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-rehome-neutral-500">
                            JPEG, PNG or WebP (MAX. 5 images)
                          </p>
                        </div>
                        <Input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          multiple
                          onChange={handleImageChange}
                          disabled={images.length >= 5 || uploading}
                        />
                      </label>
                    </div>
                  </div>
                  
                  {images.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Selected Images ({images.length}/5):</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                        {images.map((file, index) => (
                          <div key={index} className="relative group">
                            <div className="h-24 rounded-md overflow-hidden border border-rehome-neutral-200">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${index}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow group-hover:opacity-100 opacity-0 transition-opacity"
                            >
                              <X className="h-4 w-4 text-rehome-neutral-500" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-rehome-green-600 hover:bg-rehome-green-700"
                  disabled={isSubmitting || uploading}
                >
                  {isSubmitting || uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {uploading ? `Uploading Images... ${Math.round(uploadProgress)}%` : "Listing Item..."}
                    </>
                  ) : (
                    "List Item for Sale"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SellItem;
