import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/common/utils/axiosClient";
import { User } from "@/common/types/index.types";

const getUserById = async (context: QueryFunctionContext) => {
  const { data } = await axiosClient.get<User>(`/user/${context.queryKey[1]}`);
  return data;
};

const useQueryGetUserById = (userId: string) => {
  const { data, error, isError, isFetched, isLoading, isSuccess } = useQuery({
    queryKey: ["/user", userId],
    queryFn: getUserById,
    enabled: !!userId,
  });

  return { data, error, isError, isFetched, isLoading, isSuccess };
};

export default useQueryGetUserById;
