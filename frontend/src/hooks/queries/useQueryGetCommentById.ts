import { axiosClient } from "@/common/utils/axiosClient";
import { Comment } from "./../../common/types/index.types";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

const useQueryGetCommentById = ({
  commentId,
}: {
  commentId: Comment["id"];
}) => {
  const getCommentById = async (context: QueryFunctionContext) => {
    const { data } = await axiosClient.get<Comment>(
      `/comment/${context.queryKey[1]}`
    );
    return data;
  };
  const { data, error, isFetched, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["/comment", commentId],
    queryFn: getCommentById,
    enabled: !!commentId,
  });

  return { data, error, isFetched, isLoading, isSuccess, isError };
};

export default useQueryGetCommentById;
