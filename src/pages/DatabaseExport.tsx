
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Download, Upload, Database } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import {
  getProductsCSV,
  getProfilesCSV,
  getFavoritesCSV,
  getMessagesCSV,
  getReviewsCSV,
  getOrdersCSV,
  getCategoriesCSV,
  downloadCSV,
  uploadCSV,
  getAvailableTables
} from "@/services/csvService";
import { useAuth } from "@/contexts/AuthContext";

const DatabaseExport = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTable, setSelectedTable] = useState<string>("products");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch available tables
  const { data: tables, isLoading: tablesLoading } = useQuery({
    queryKey: ["tables"],
    queryFn: getAvailableTables
  });

  const handleExport = async (tableName: string) => {
    try {
      let csvData = "";
      
      switch (tableName) {
        case "products":
          csvData = await getProductsCSV();
          break;
        case "profiles":
          csvData = await getProfilesCSV();
          break;
        case "favorites":
          csvData = await getFavoritesCSV();
          break;
        case "messages":
          csvData = await getMessagesCSV();
          break;
        case "reviews":
          csvData = await getReviewsCSV();
          break;
        case "orders":
          csvData = await getOrdersCSV();
          break;
        case "categories":
          csvData = await getCategoriesCSV();
          break;
        default:
          throw new Error(`Unknown table: ${tableName}`);
      }
      
      downloadCSV(csvData, `${tableName}.csv`);
      
      toast({
        title: "Export successful",
        description: `${tableName} data exported to CSV`,
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Export failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCsvFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!csvFile || !selectedTable) {
      toast({
        title: "Upload failed",
        description: "Please select a CSV file and target table",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    try {
      const csvText = await csvFile.text();
      const result = await uploadCSV(selectedTable, csvText);
      
      if (result.success) {
        toast({
          title: "Upload successful",
          description: result.message,
        });
        setCsvFile(null);
      } else {
        toast({
          title: "Upload failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Only allow access for authenticated users
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 flex items-center justify-center">
            <Database className="mr-2 h-8 w-8" />
            Database Management
          </h1>
          
          <Tabs defaultValue="export" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="export">Export Data</TabsTrigger>
              <TabsTrigger value="import">Import Data</TabsTrigger>
            </TabsList>
            
            <TabsContent value="export" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Export Database Tables</CardTitle>
                  <CardDescription>
                    Download your data tables as CSV files
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {tablesLoading ? (
                      <div className="flex justify-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin" />
                      </div>
                    ) : (
                      tables?.map((table) => (
                        <div key={table} className="flex justify-between items-center p-4 border rounded-lg">
                          <span className="font-medium capitalize">{table}</span>
                          <Button
                            variant="outline"
                            onClick={() => handleExport(table)}
                            className="flex items-center"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Export
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="import" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Import Data</CardTitle>
                  <CardDescription>
                    Upload CSV files to import data into database tables
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Select Target Table</label>
                      <Select
                        value={selectedTable}
                        onValueChange={setSelectedTable}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Table" />
                        </SelectTrigger>
                        <SelectContent>
                          {tablesLoading ? (
                            <div className="flex justify-center py-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                            </div>
                          ) : (
                            tables?.map((table) => (
                              <SelectItem key={table} value={table}>
                                {table}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Upload CSV File</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          accept=".csv"
                          onChange={handleFileChange}
                          className="flex-1 p-2 border rounded"
                        />
                      </div>
                      {csvFile && (
                        <p className="text-sm text-gray-500">
                          Selected: {csvFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleUpload} 
                    disabled={!csvFile || !selectedTable || isUploading}
                    className="w-full"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload and Import
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DatabaseExport;
