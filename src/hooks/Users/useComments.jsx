import { useQuery } from "@tanstack/react-query";
// import { getComments } from "../../supabase/supabaseAPI";
import services from "../../supabase/supabase.services";
import { useCurrentUser } from "./useCurrentUser";
import { useParams } from "react-router-dom";

export function useComments() {
  const getComments = services.getComments;
  const CurrentUser = useCurrentUser();
  const { commentId } = useParams();

  const { data: comments, isLoading: isLoadingComments } = useQuery({
    queryKey: ["comments", CurrentUser],
    queryFn: () => getComments(Number(commentId)),
  });

  return { comments, isLoadingComments };
}
