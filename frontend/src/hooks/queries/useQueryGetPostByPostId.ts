import { Post } from "@/common/types/index.types";
import { axiosClient } from "@/common/utils/axiosClient";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

const getPostByPostId = async (context: QueryFunctionContext) => {
  const { data } = await axiosClient.get<Post>(`/post/${context.queryKey[1]}`, {
    params: {
      lastId: context.pageParam,
      limit: 10,
    },
  });
  return data;
};

const useQueryGetPostByPostId = (postId: string | undefined) => {
  const { data, error, isError, isFetched, isLoading, isSuccess } = useQuery({
    queryKey: ["/post", postId] as [string, string],
    queryFn: getPostByPostId,
    enabled: !!postId,
  });
  return { data, error, isError, isFetched, isLoading, isSuccess };
};

export default useQueryGetPostByPostId;
