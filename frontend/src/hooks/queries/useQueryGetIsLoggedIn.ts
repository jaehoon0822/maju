import { axiosClient } from "@/common/utils/axiosClient";
import { useQuery } from "@tanstack/react-query";

const useQueryGetIsLoggedIn = () => {
  const isLoggedIn = async () => {
    const { data } = await axiosClient.get("/auth/isLoggedIn");
    return data;
  };
  const { data, error, isError, isFetched, isLoading, isSuccess } = useQuery({
    queryKey: ["/isLoggedIn"],
    queryFn: isLoggedIn,
    retry: 3,
    retryDelay: 500,
  });

  return { data, error, isError, isFetched, isLoading, isSuccess };
};

export default useQueryGetIsLoggedIn;
