import { useQueryClient } from "@tanstack/react-query";
import useMutationDeletePost from "../mutations/useMutationDeletePost";
import useQueryGetUser from "../queries/useQueryGetUser";
import { useDispatch, useSelector } from "@/common/store";
import { useRouter } from "next/router";
import { setPos } from "@/common/store/slices/posSlice";
import { AxiosError } from "axios";
import { useEffect, useRef } from "react";

const useDeletePostModal = () => {
  const deletPostMadalRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
  const deletePostMutation = useMutationDeletePost();
  const { data: userData } = useQueryGetUser();
  const posDispatch = useDispatch();
  const { pos } = useSelector((state) => state.pos);
  const { query, back } = useRouter();

  const onClickDeletePostModal = () => {
    back();
    window.scrollTo({ top: pos });
    posDispatch(setPos(window.scrollY + 1));
    document.body.style.overflow = "auto";
  };
  const onClickDeletePost = () => {
    deletePostMutation.mutate(
      { postId: query.postId as string },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["/posts", userData?.id]);
          back();
          posDispatch(setPos(window.scrollY));
          document.body.style.overflow = "auto";
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
    pos,
    onClickDeletePost,
    onClickDeletePostModal,
  };
};

export default useDeletePostModal;
