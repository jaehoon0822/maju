import { User } from "@/common/types/index.types";
import { axiosClient } from "@/common/utils/axiosClient";
import { useQuery } from "@tanstack/react-query";

const useQueryGetUser = () => {
  const { isLoading, isFetched, isSuccess, data, isError, error } = useQuery({
    queryKey: ["/user"],
    queryFn: async () => {
      try {
        const res = await axiosClient.get<User>("/user");
        return res.data;
      } catch (error) {
        throw error;
      }
    },
    staleTime: 3000000,
    cacheTime: 3000000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    retry: 0,
  });
  return { isLoading, isFetched, isSuccess, data, isError, error };
};

export default useQueryGetUser;
