import { User } from "@/common/types/index.types";
import { axiosClient } from "@/common/utils/axiosClient";
import { useMutation } from "@tanstack/react-query";

const useMutationFollow = () => {
  const follow = async (data: { postUserId: User["id"] }) => {
    const res = await axiosClient.post(`/user/follow/${data.postUserId}`);
    return res.data;
  };

  const mutation = useMutation(follow);
  return mutation;
};

export default useMutationFollow;
