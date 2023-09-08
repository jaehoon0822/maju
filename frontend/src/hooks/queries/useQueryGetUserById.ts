import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/common/utils/axiosClient";

const getUserById = async (context: QueryFunctionContext) => {
  const { data } = await axiosClient.get(`/user/${context.queryKey[1]}`);
  return data;
};

const useQueryGetUserById = (userId: string) => {
  const { data, error, isError, isFetched, isLoading, isSuccess } = useQuery(
    ["/user", userId],
    getUserById
  );

  return { data, error, isError, isFetched, isLoading, isSuccess };
};

export default useQueryGetUserById;
