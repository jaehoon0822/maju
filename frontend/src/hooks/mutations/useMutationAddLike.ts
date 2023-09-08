import { axiosClient } from "@/common/utils/axiosClient";
import { useMutation } from "@tanstack/react-query";

const addLike = async (data: { postId: string }) => {
  const res = await axiosClient.post<{ count: number }>(
    `/like/${data.postId}`,
    data
  );
  return res.data;
};

const useMutationAddLike = () => {
  const mutation = useMutation(addLike);
  return mutation;
};

export default useMutationAddLike;
