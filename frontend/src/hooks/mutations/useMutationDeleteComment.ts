import { Comment } from "@/common/types/index.types";
import { axiosClient } from "@/common/utils/axiosClient";
import { useMutation } from "@tanstack/react-query";

const useMutationDeleteComment = () => {
  const deleteComment = async (commentId: Comment["id"]) => {
    const res = await axiosClient.delete(`/comment/${commentId}`);
    return res.data;
  };

  const mutation = useMutation(deleteComment);
  return mutation;
};

export default useMutationDeleteComment;
