import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unlikePost } from "../../supabase/supabaseAPI";

export function useUnlikePost() {
  const queryClient = useQueryClient();

  const { mutate: removeLike, isPending: isUnliking } = useMutation({
    mutationFn: ({ id, user_id }) => unlikePost(id, user_id),
    onSuccess: () => {
      // queryClient.invalidateQueries({
      //   queryKey: ["users", "allPosts"],
      // });
      queryClient.invalidateQueries({ active: true });
    },
  });
  return { removeLike, isUnliking };
}
