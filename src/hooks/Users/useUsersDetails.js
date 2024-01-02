import { useInfiniteQuery } from "@tanstack/react-query";
import { loadUserDetails } from "../../supabase/supabaseAPI";
import { PAGE_SIZE } from "../../utils/consts";

export function useUser() {
  const {
    isLoading: loadingUsers,
    data: users,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: loadUserDetails,
    getNextPageParam: (lastPage) => {
      const totalPage = Math.floor(lastPage?.count / PAGE_SIZE);

      if (lastPage?.pageOffset >= totalPage) {
        return null;
      }

      return lastPage.pageOffset + 1;
    },
  });

  return {
    loadingUsers,
    error,
    users,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
