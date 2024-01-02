import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { insertPosts } from "../../supabase/supabaseAPI";
import services from "../../supabase/supabase.services";
import toast from "react-hot-toast";

export function useInsert() {
  const insertPosts = services.insertPost;
  const queryClient = useQueryClient();

  const {
    mutate: addPosts,
    isPending: isLoadingAddPosts,
    error,
  } = useMutation({
    mutationFn: (post) => insertPosts(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(`posted`);
    },
    onError: () => {
      toast.error(error.message);
    },
  });
  return { addPosts, isLoadingAddPosts };
}
