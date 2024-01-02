import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { addComment } from "../../supabase/supabaseAPI";
import services from "../../supabase/supabase.services";
import toast from "react-hot-toast";
import { useCurrentUser } from "./useCurrentUser";

export function useAddComment() {
  const addComment = services.addComment;
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();
  const {
    error,
    mutate: createComment,
    isPending: isCommenting,
  } = useMutation({
    mutationFn: ({ postID, content }) =>
      addComment(content, postID, currentUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
      toast.success("added comment");
    },
    onError: () => {
      toast.error(error.message);
    },
  });
  return { createComment, isCommenting };
}
