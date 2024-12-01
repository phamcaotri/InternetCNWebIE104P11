import supabase from "../config/supabaseclient.js";

const fetchFiles = async () => {
    try {
      const { data, error } = await supabase.storage.from("storage").list("", { limit: 100 });
      if (error) {
        console.error("Error fetching files:", error.message);
        return [];
      }
      if (data.length === 0) {
        console.warn("No files found in bucket.");
        return [];
      }
      console.log("Fetched files:", data);
      return data;
    } catch (error) {
      console.error("Error:", error.message);
      return [];
    }
  };
  
  fetchFiles();
   