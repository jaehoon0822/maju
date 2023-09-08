import {
  QueryFunctionContext,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosClient } from "@/common/utils/axiosClient";
import { Post, User } from "@/common/types/index.types";

const getPosts = async (userId: User["id"], pageParam: string) => {
  const limit = 10;
  try {
    const { data } = await axiosClient.get<Post[]>(`/post/user/${userId}?`, {
      params: {
        limit,
        lastId: pageParam,
      },
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
  }
};

const useQueryGetPostByUserId = (userId: string) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
    isFetched,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ["/posts", userId],
    queryFn: ({ queryKey, pageParam = undefined }: QueryFunctionContext) =>
      getPosts(queryKey[1] as string, pageParam),
    getNextPageParam: (lastPage, _allPages) =>
      lastPage?.[lastPage.length - 1]
        ? lastPage?.[lastPage.length - 1].id
        : undefined,
  });

  return {
    data,
    error,
    isError,
    isLoading,
    isFetched,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export default useQueryGetPostByUserId;
