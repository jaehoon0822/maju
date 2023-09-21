import { Post } from "./../../common/types/index.types";
import { Comment } from "@/common/types/index.types";
import { axiosClient } from "@/common/utils/axiosClient";
import { useMutation } from "@tanstack/react-query";

const useMutationCreateComment = ({ postId }: { postId: Post["id"] }) => {
  // comment 생성 함수
  const createComment = async (data: Pick<Comment, "content">) => {
    const res = await axiosClient.post(`/comment/post/${postId}`, data);
    return res.data;
  };
  // mutation 생성
  const mutation = useMutation(createComment);
  return mutation;
};

export default useMutationCreateComment;
