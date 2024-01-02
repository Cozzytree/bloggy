import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { deletePosts } from "../../supabase/supabaseAPI";
import services from "../../supabase/supabase.services";
import toast from "react-hot-toast";

export function useDeletePost() {
  const deletePosts = services.deletePosts;
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
