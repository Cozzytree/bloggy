import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../supabase/supabaseAPI";
import { PAGE_SIZE } from "../../utils/consts";

function useAllposts() {
  const {
    isLoading: loadingPosts,
    data: pages,
    error: postsError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["allPosts"],
    queryFn: getAllPosts,
    getNextPageParam: (lastPage) => {
      if (lastPage.pageoffset * PAGE_SIZE + PAGE_SIZE - 1 > lastPage.count) {
        return null;
      }

      return lastPage.pageoffset + 1;
    },
  });
  return { loadingPosts, pages, postsError, fetchNextPage, hasNextPage };
}

export default useAllposts;
