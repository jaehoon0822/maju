import { Comment } from "@/common/types/index.types";
import { axiosClient } from "@/common/utils/axiosClient";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";

const useQueryGetComments = ({
  postId,
  limit = 10,
}: {
  postId: string;
  limit?: number;
}) => {
  const getComments = async (context: QueryFunctionContext) => {
    const { data } = await axiosClient.get<Comment[]>(
      `/comment/post/${context.queryKey[1]}`,
      {
        params: {
          limit,
          lastId: context.pageParam,
        },
      }
    );
    return data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["/comments", postId],
    queryFn: getComments,
    getNextPageParam: (lastPage, _allParam) => {
      const lastIdx = lastPage.length - 1;
      return lastPage[lastIdx] ? lastPage[lastIdx].id : undefined;
    },
    enabled: !!postId,
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isFetching,
    isError,
    isSuccess,
  };
};

export default useQueryGetComments;
