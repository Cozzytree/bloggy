import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../supabase/supabaseAPI";

export function useComments() {
  const {
    data: comments,
    isLoading: isLoadingComments,
    refetch,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: getComments,
    enabled: false,
  });

  const fetchComments = async (id) => {
    await refetch(["comments", id]);
  };

  return { fetchComments, comments, isLoadingComments };
}
