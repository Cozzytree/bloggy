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
      const totalPage = Math.floor(lastPage?.count / PAGE_SIZE);
      if (totalPage >= lastPage?.pageoffset) {
        return null;
      }

      return lastPage.pageoffset + 1;
    },
  });
  return { loadingPosts, pages, postsError, fetchNextPage, hasNextPage };
}

export default useAllposts;
