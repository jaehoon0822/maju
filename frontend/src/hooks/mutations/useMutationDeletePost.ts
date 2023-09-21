import { axiosClient } from "@/common/utils/axiosClient";
import { useMutation } from "@tanstack/react-query";

const deletePost = async (data: { postId: string }) => {
  const res = await axiosClient.delete(`/post/${data.postId}`);
  return res.data;
};

const useMutationDeletePost = () => {
  const mutation = useMutation(deletePost);
  return mutation;
};

export default useMutationDeletePost;
