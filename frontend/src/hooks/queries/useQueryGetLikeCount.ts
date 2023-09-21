import { axiosClient } from "@/common/utils/axiosClient";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

const getLikeCount = async (context: QueryFunctionContext) => {
  const { data } = await axiosClient.get<{ count: string }>(
    `/like/${context.queryKey[1]}`
  );
  return data;
};

const useQueryGetLikeCount = (postId: string) => {
  const { data, error, isError, isLoading, isFetched, isSuccess } = useQuery({
    queryKey: ["/like", postId],
    queryFn: getLikeCount,
  });
  return { data, error, isError, isLoading, isFetched, isSuccess };
};

export default useQueryGetLikeCount;
