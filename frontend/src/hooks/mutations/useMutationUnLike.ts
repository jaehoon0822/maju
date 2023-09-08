import { axiosClient } from "@/common/utils/axiosClient";
import { useMutation } from "@tanstack/react-query";

const unLike = async (data: { postId: string }) => {
  const res = await axiosClient.delete(`/like/${data.postId}`);
  return res.data;
};

const useMutationUnLike = () => {
  const mutation = useMutation(unLike);
  return mutation;
};

export default useMutationUnLike;
