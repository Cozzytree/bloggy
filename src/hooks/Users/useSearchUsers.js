import supabase from "../../supabase/supabase";
import { useCallback, useState } from "react";

export function useSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setIsError] = useState("");
  const [searchResults, setSearchResults] = useState();

  const searchUsers = useCallback(async (username) => {
    setIsLoading(true);
    setIsError("");
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .textSearch("username", username);

      if (error) throw new Error("No records");

      if (!data) setIsError("No records");
      setSearchResults(data);
    } catch (err) {
      setIsError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { searchUsers, isLoading, searchError, searchResults };
}
