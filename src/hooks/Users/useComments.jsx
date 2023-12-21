import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../supabase/supabaseAPI";
import { useCurrentUser } from "../Users/useCurrentUser";
import { useParams } from "react-router-dom";

export function useComments() {
  const CurrentUser = useCurrentUser();
  const { commentId } = useParams();

  const { data: comments, isLoading: isLoadingComments } = useQuery({
    queryKey: ["comments", CurrentUser],
    queryFn: () => getComments(Number(commentId)),
  });

  return { comments, isLoadingComments };
}
