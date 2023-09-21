import { useQueryClient } from "@tanstack/react-query";
import useMutationDeletePost from "../mutations/useMutationDeletePost";
import useQueryGetUser from "../queries/useQueryGetUser";
import { useSelector } from "@/common/store";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { useRef } from "react";
import useQueryGetPostByPostId from "../queries/useQueryGetPostByPostId";

const useDeletePostModal = () => {
  const deletPostMadalRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
  const deletePostMutation = useMutationDeletePost();
  const { pos } = useSelector((state) => state.pos);
  const { query, back } = useRouter();
  const { data: postData } = useQueryGetPostByPostId(query.postId as string);
  const { data: userData } = useQueryGetUser();
  const isMyPost = postData?.user.id === userData?.id;

  const onClickDeletePost = () => {
    deletePostMutation.mutate(
      { postId: query.postId as string },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["/posts", userData?.id]);
          back();
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            throw error;
          }
        },
      }
    );
  };

  return {
    deletPostMadalRef,
    query,
    back,
    pos,
    onClickDeletePost,
    isMyPost,
  };
};

export default useDeletePostModal;
