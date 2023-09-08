import { useQueryClient } from "@tanstack/react-query";
import useQueryGetUser from "../queries/useQueryGetUser";
import useMutationAddLike from "../mutations/useMutationAddLike";
import useMutationUnLike from "../mutations/useMutationUnLike";
import { Post } from "@/common/types/index.types";
import { AxiosError } from "axios";
import useMutationDeletePost from "../mutations/useMutationDeletePost";
import { useRouter } from "next/router";
import { useDispatch } from "@/common/store";
import { setPos } from "@/common/store/slices/posSlice";
import { MouseEvent, useEffect } from "react";

const usePostBottomBar = (post: Post) => {
  const posDispatch = useDispatch();
  const queryClient = useQueryClient();
  const { push, pathname } = useRouter();
  const { data: userData } = useQueryGetUser();
  const isMyPost = post.user.id === userData?.id;
  const addLikeMutation = useMutationAddLike();
  const unLikeMutation = useMutationUnLike();
  const deletePostMutation = useMutationDeletePost();
  const likeCount = post.likeCount;
  const isLikeUser = post.likes?.some((like) => {
    like.userId === userData?.id;
  });

  const onClickDeletePostModal = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    push(`/${pathname}?modal=deletePost&postId=${post.id}`);
    posDispatch(setPos(window.scrollY));
  };

  const onClickDeletePost = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    deletePostMutation.mutate(
      { postId: post.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["/post", userData?.id]);
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            throw error;
          }
        },
      }
    );
  };

  const onClickUnLike = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    unLikeMutation.mutate(
      { postId: post.id },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(["/like", post.id], data);
          queryClient.invalidateQueries(["/like", post.id, "/users"]);
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            throw error;
          }
        },
      }
    );
  };

  const onClickAddLike = () => {
    addLikeMutation.mutate(
      { postId: post.id },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(["/like", post.id], data);
          queryClient.invalidateQueries(["/like", post.id, "/users"]);
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            throw error;
          }
        },
      }
    );
  };

  const onClickUpdatePostModal = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    posDispatch(setPos(window.scrollY));
    push(`${pathname}?modal=updatePost&postId=${post.id}`);
  };

  const onClickCommentsModal = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    push(`${pathname}?modal=comments&postId=${post.id}`);
  };

  return {
    onClickAddLike,
    onClickCommentsModal,
    onClickUnLike,
    onClickDeletePost,
    onClickDeletePostModal,
    onClickUpdatePostModal,
    userData,
    likeCount,
    isLikeUser,
    isMyPost,
    push,
  };
};

export default usePostBottomBar;
