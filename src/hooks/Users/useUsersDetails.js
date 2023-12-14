import { useQuery } from "@tanstack/react-query";
import { loadUserDetails } from "../../supabase/supabaseAPI";

export function useUser() {
  const {
    isLoading: loadingUsers,
    data: users,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: loadUserDetails,
  });

  return { loadingUsers, error, users };
}
