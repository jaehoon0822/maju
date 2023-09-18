import { Comment } from "@/common/types/index.types";
import { axiosClient } from "@/common/utils/axiosClient";
import { useMutation } from "@tanstack/react-query";
import React from "react";

const useMutationUpdateComment = ({
  commentId,
}: {
  commentId: Comment["id"];
}) => {
  const updateComment = async (data: Pick<Comment, "id" | "content">) => {
    const res = await axiosClient.patch(`/comment/${commentId}`, data);
    return res.data;
  };
  const mutation = useMutation(updateComment);
  return mutation;
};

export default useMutationUpdateComment;
