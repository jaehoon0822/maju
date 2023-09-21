import { Post } from "@/common/types/index.types";
import { axiosClient } from "@/common/utils/axiosClient";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";

const useQueryGetHashtagPosts = ({
  hashtagTitle,
  limit = 10,
}: {
  hashtagTitle: string;
  limit?: number;
}) => {
  const getHashtagPosts = async (context: QueryFunctionContext) => {
    const { data } = await axiosClient.get<Post[]>("/post/get/hashtag", {
      params: {
        hashtag: context.queryKey[2],
        limit,
        lastId: context.pageParam,
      },
    });
    return data;
  };

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    isFetched,
    isSuccess,
  } = useInfiniteQuery({
    queryFn: getHashtagPosts,
    queryKey: ["/hashtag", "/posts", hashtagTitle],
    getNextPageParam: (lastPage, _allParam) => {
      return lastPage?.[lastPage.length - 1]?.id
        ? lastPage[lastPage.length - 1]
        : undefined;
    },
    enabled: hashtagTitle !== "",
  });

  return {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetched,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useQueryGetHashtagPosts;
