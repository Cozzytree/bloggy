import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { likePost } from "../../supabase/supabaseAPI";
import services from "../../supabase/supabase.services";
import toast from "react-hot-toast";

export function useLikePost() {
  const queryClient = useQueryClient();
  const { likePost } = services;
  const {
    mutate: addLike,
    error,
    isPending: isLiking,
  } = useMutation({
    mutationFn: ({ postId, userId }) => likePost(postId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
      // queryClient.invalidateQueries({
      //   queryKey: ["allPosts"],
      // });
    },
    onError: () => {
      toast.error(error.message);
    },
  });
  return { addLike, isLiking };
}
