import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "../../supabase/supabaseAPI";
import toast from "react-hot-toast";

export function useLikePost() {
  const queryClient = useQueryClient();

  const { mutate: addLike, error } = useMutation({
    mutationFn: ({ postId, userId }) => likePost(postId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("liked");
    },
    onError: () => {
      toast.error(error.message);
    },
  });
  return { addLike };
}
