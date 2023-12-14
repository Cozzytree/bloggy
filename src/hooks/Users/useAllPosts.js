import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../supabase/supabaseAPI";

function useAllposts() {
  const {
    isLoading: loadingPosts,
    data: allPosts,
    error: postsError,
  } = useQuery({
    queryKey: ["allPosts"],
    queryFn: getAllPosts,
  });
  return { loadingPosts, allPosts, postsError };
}

export default useAllposts;
