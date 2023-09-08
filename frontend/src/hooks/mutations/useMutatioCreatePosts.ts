import { axiosClient } from "@/common/utils/axiosClient";
import { useMutation } from "@tanstack/react-query";

const createPost = async (data: { content: string; img: string[] }) => {
  const { data: postData } = await axiosClient.post("/post", data);
  return postData;
};

const useMutationCreatePosts = () => {
  const mutation = useMutation(createPost);
  return mutation;
};

export default useMutationCreatePosts;
