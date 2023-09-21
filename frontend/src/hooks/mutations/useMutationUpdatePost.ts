import { axiosClient } from "@/common/utils/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useMutationUpdatePost = () => {
  const { query } = useRouter();

  const updatePost = async (data: { content: string; img: string[] }) => {
    const res = await axiosClient.put(`/post/${query.postId}`, data);
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: updatePost,
  });
  return mutation;
};

export default useMutationUpdatePost;
