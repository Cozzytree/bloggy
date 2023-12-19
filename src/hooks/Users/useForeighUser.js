import { useQuery } from "@tanstack/react-query";
import { foreignUser } from "../../supabase/supabaseAPI";
import { useSearchParams } from "react-router-dom";

export function useForeighUser() {
  const [searchParam] = useSearchParams();

  const foreignUserId = searchParam.get("");

  const {
    data: foreignUserData,
    isLoading: loadingForeign,
    error,
  } = useQuery({
    queryFn: () => foreignUser(foreignUserId),
    queryKey: ["foreignUser"],
    refetchOnMount: true,
  });
  return { foreignUserData, loadingForeign, error };
  //   export {}
}
