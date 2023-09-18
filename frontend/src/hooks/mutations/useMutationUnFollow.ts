import { useMutation } from "@tanstack/react-query";
import { User } from "@/common/types/index.types";
import { axiosClient } from "@/common/utils/axiosClient";

const useMutationUnFollow = () => {
  const unFollow = async (data: { postUserId: User["id"] }) => {
    const res = await axiosClient.post(`/user/unfollow/${data.postUserId}`);
    return res.data;
  };
  const mutation = useMutation(unFollow);
  return mutation;
};

export default useMutationUnFollow;
