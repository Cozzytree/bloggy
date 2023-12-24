import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../supabase/supabaseAPI";

export function useGetCurrentUser() {
  const { data, isLoading } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["getCurrentUser"],
  });
  return { data, isLoading, isAuthenticated: data?.role === "authenticated" };
}
