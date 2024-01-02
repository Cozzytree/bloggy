import { useQuery } from "@tanstack/react-query";
import authService from "../../supabase/supabase.auth";

export function useGetCurrentUser() {
  const { data, isLoading } = useQuery({
    queryFn: () => authService.getCurrentUser(),
    queryKey: ["getCurrentUser"],
  });
  return { data, isLoading, isAuthenticated: data?.role === "authenticated" };
}
