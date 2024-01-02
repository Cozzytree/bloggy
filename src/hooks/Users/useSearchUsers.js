import { useMutation } from "@tanstack/react-query";
import services from "../../supabase/supabase.services";

export function useSearch() {
  const { searchUser } = services;
  const {
    mutate: search,
    isPending,
    data: searchResults,
    error,
  } = useMutation({
    mutationFn: (username) => searchUser(username),
    mutationKey: ["searchResults"],
  });

  return { search, isPending, searchResults, error };
}
