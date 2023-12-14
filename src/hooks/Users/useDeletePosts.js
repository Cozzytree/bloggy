import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePosts } from "../../supabase/supabaseAPI";
import toast from "react-hot-toast";

export function useDeletePost() {
  const QueryClient = useQueryClient();
  const {
    mutate: deletePost,
    isPending: isDeleting,
    error,
  } = useMutation({
    mutationFn: deletePosts,
    onSuccess: () => {
      toast.success("Succesfully Deleted");
      QueryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: () => {
      toast.error(error.message);
    },
  });
  return { deletePost, isDeleting };
}
