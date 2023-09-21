import { axiosClient } from "@/common/utils/axiosClient";
import { useMutation } from "@tanstack/react-query";

const useMutationLogout = () => {
  const logout = async () => {
    const res = await axiosClient.post("/auth/logout");
    return res.data;
  };
  const mutation = useMutation(logout);
  return mutation;
};

export default useMutationLogout;
