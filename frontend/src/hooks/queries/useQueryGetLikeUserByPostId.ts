import { axiosClient } from "@/common/utils/axiosClient";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

const getLikeUserByPostId = async (context: QueryFunctionContext) => {
  const { data } = await axiosClient.get<
    { user_id: string; post_id: string }[]
  >(`/like/${context.queryKey[1]}/users`);
  return data;
};

export const useQueryGetLikeUserByPostId = (postId: string) => {
  const { data, error, isLoading, isFetched, isError, isSuccess } = useQuery(
    ["/like", postId, "/users"],
    getLikeUserByPostId
  );

  return { data, error, isLoading, isFetched, isError, isSuccess };
};
