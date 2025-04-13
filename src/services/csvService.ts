import { supabase } from "@/integrations/supabase/client";
import { Product, Profile, Favorite, Message, Review, Order, Category } from "@/types/database.types";

/**
 * Converts an array of objects to CSV format
 */
export const convertToCSV = <T extends Record<string, any>>(data: T[]): string => {
  if (data.length === 0) return '';
  
  // Get headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV header row
  const headerRow = headers.join(',');
  
  // Create rows for each data object
  const rows = data.map(obj => 
    headers.map(header => {
      const value = obj[header];
      
      // Handle arrays (like images in products)
      if (Array.isArray(value)) {
        return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
      }
      
      // Handle null values
      if (value === null || value === undefined) {
        return '';
      }
      
      // If value contains commas, quotes, or newlines, wrap in quotes and escape any quotes
      if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      
      return value;
    }).join(',')
  );
  
  // Combine header row and data rows
  return [headerRow, ...rows].join('\n');
};

/**
 * Downloads a CSV string as a file
 */
export const downloadCSV = (csvString: string, fileName: string) => {
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Fetches products from the database and returns as CSV
 */
export const getProductsCSV = async (): Promise<string> => {
  const { data, error } = await supabase
    .from("products")
    .select("*");
    
  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  
  return convertToCSV(data as Product[]);
};

/**
 * Fetches profiles from the database and returns as CSV
 */
export const getProfilesCSV = async (): Promise<string> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*");
    
  if (error) {
    console.error("Error fetching profiles:", error);
    throw error;
  }
  
  return convertToCSV(data as Profile[]);
};

/**
 * Fetches favorites from the database and returns as CSV
 */
export const getFavoritesCSV = async (): Promise<string> => {
  const { data, error } = await supabase
    .from("favorites")
    .select("*");
    
  if (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
  
  return convertToCSV(data as Favorite[]);
};

/**
 * Fetches messages from the database and returns as CSV
 */
export const getMessagesCSV = async (): Promise<string> => {
  const { data, error } = await supabase
    .from("messages")
    .select("*");
    
  if (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
  
  return convertToCSV(data as Message[]);
};

/**
 * Fetches reviews from the database and returns as CSV
 */
export const getReviewsCSV = async (): Promise<string> => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*");
    
  if (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
  
  return convertToCSV(data as Review[]);
};

/**
 * Fetches orders from the database and returns as CSV
 */
export const getOrdersCSV = async (): Promise<string> => {
  const { data, error } = await supabase
    .from("orders")
    .select("*");
    
  if (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
  
  return convertToCSV(data as Order[]);
};

/**
 * Fetches categories from the database and returns as CSV
 */
export const getCategoriesCSV = async (): Promise<string> => {
  const { data, error } = await supabase
    .from("categories")
    .select("*");
    
  if (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
  
  return convertToCSV(data as Category[]);
};

/**
 * Uploads a CSV file to a table in the database
 */
export const uploadCSV = async (
  tableName: string, 
  csvString: string
): Promise<{ success: boolean; message: string }> => {
  try {
    // Parse CSV to JSON
    const rows = csvString.split('\n');
    if (rows.length < 2) {
      return { success: false, message: 'CSV file is empty or invalid' };
    }
    
    const headers = rows[0].split(',');
    const dataRows = rows.slice(1).filter(row => row.trim() !== '');
    
    const jsonData = dataRows.map(row => {
      const values = parseCSVRow(row);
      const obj: Record<string, any> = {};
      
      headers.forEach((header, index) => {
        let value = values[index] || '';
        
        // Try to parse JSON for array fields (like images)
        if (value.startsWith('[') && value.endsWith(']')) {
          try {
            value = JSON.parse(value);
          } catch (e) {
            // If parsing fails, keep as string
          }
        }
        
        obj[header] = value === '' ? null : value;
      });
      
      return obj;
    });
    
    // Insert the data into the table
    const { error } = await supabase
      .from(tableName)
      .upsert(jsonData, { onConflict: 'id' });
      
    if (error) {
      console.error(`Error uploading to ${tableName}:`, error);
      return { success: false, message: `Error: ${error.message}` };
    }
    
    return { 
      success: true, 
      message: `Successfully uploaded ${jsonData.length} rows to ${tableName}` 
    };
  } catch (error) {
    console.error(`Error processing CSV for ${tableName}:`, error);
    return { 
      success: false, 
      message: `Error processing CSV: ${error instanceof Error ? error.message : String(error)}` 
    };
  }
};

/**
 * Helper function to properly parse CSV rows that might contain quoted values
 */
const parseCSVRow = (row: string): string[] => {
  const result: string[] = [];
  let inQuotes = false;
  let currentValue = '';
  
  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    const nextChar = row[i + 1];
    
    if (char === '"' && inQuotes && nextChar === '"') {
      // Handle escaped quotes (two consecutive quotes)
      currentValue += '"';
      i++; // Skip the next quote
    } else if (char === '"') {
      // Toggle quote state
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      // End of field
      result.push(currentValue);
      currentValue = '';
    } else {
      // Add character to current field
      currentValue += char;
    }
  }
  
  // Add the last field
  result.push(currentValue);
  return result;
};

/**
 * Gets all available tables in the database
 */
export const getAvailableTables = async (): Promise<string[]> => {
  return ['products', 'profiles', 'favorites', 'messages', 'reviews', 'orders', 'categories'];
};
