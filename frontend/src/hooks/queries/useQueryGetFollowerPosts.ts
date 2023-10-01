import { Post } from "@/common/types/index.types";
import { axiosClient } from "@/common/utils/axiosClient";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";

const useQueryGetFollowerPosts = () => {
  const getFollowerPosts = async (context: QueryFunctionContext) => {
    const { data } = await axiosClient.get<Post[]>(`/post/get/follower`, {
      params: {
        limit: 10,
        lastId: context.pageParam,
      },
    });
    return data;
  };
  const {
    data,
    error,
    isError,
    isFetched,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["/posts", "/follower"],
    queryFn: getFollowerPosts,
    getNextPageParam: (lastPage, _allParam) => {
      const lastPostIdx = lastPage.length - 1;
      return lastPage[lastPostIdx] ? lastPage[lastPostIdx].id : undefined;
    },
  });
  return {
    data,
    error,
    isError,
    isFetched,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};

export default useQueryGetFollowerPosts;
