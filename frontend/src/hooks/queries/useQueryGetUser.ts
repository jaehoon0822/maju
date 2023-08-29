import { axiosClient } from "@/common/utils/axiosClient";
import { useQuery } from "@tanstack/react-query";

const useQueryGetUser = () => {
  const { isLoading, isFetched, data, isError, error } = useQuery({
    queryKey: ["/user"],
    queryFn: async () => {
      try {
        const res = await axiosClient.get("/user");
        return res.data;
      } catch (error) {
        throw error;
      }
    },
    staleTime: 300000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    retry: 0,
  });
  return { isLoading, isFetched, data, isError, error };
};

export default useQueryGetUser;
