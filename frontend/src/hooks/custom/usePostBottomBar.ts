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
import { MouseEvent, useCallback, useMemo } from "react";
import { getPathname } from "@/common/utils/getPathname";

const usePostBottomBar = (post: Post) => {
  const posDispatch = useDispatch();
  const queryClient = useQueryClient();
  const { push, query, asPath } = useRouter();
  const { data: userData } = useQueryGetUser();
  const addLikeMutation = useMutationAddLike();
  const unLikeMutation = useMutationUnLike();
  const deletePostMutation = useMutationDeletePost();
  const isMyPost = useMemo(
    () => post.user.id === userData?.id,
    [post.user.id, userData?.id]
  );
  const likeCount = useMemo(() => post.likeCount ?? 0, [post.likeCount]);
  const commentCount = useMemo(
    () => post.commentCount ?? 0,
    [post.commentCount]
  );
  const queryPage = useMemo(
    () => (query.page ? (query.page as string) : ""),
    [query.page]
  );
  const isLikeUser = useMemo(
    () =>
      post.likes?.some((like) => {
        return like.userId === userData?.id;
      }),
    [post.likes]
  );

  const onClickDeletePostModal = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      push(
        getPathname({
          asPath,
          queryPage,
          queryString: `modal=deletePost&postId=${post.id} `,
        })
      );
      posDispatch(setPos(window.scrollY));
    },
    [asPath, queryPage, post.id]
  );

  const onClickDeletePost = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      deletePostMutation.mutate(
        { postId: post.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["/post", userData?.id]);
            queryClient.invalidateQueries([`/hashtag`, `/posts`]);
            queryClient.invalidateQueries([`/posts`]);
          },
          onError: (error) => {
            if (error instanceof AxiosError) {
              throw error;
            }
          },
        }
      );
    },
    [asPath, queryPage, post.id]
  );

  const onClickUnLike = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      unLikeMutation.mutate(
        { postId: post.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["/post", userData?.id]);
            queryClient.invalidateQueries(["/hashtag", "/posts"]);
            queryClient.invalidateQueries([`/posts`]);
          },
          onError: (error) => {
            if (error instanceof AxiosError) {
              throw error;
            }
          },
        }
      );
    },
    [asPath, post.id, userData?.id]
  );

  const onClickAddLike = useCallback(() => {
    addLikeMutation.mutate(
      { postId: post.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["/post", userData?.id]);
          queryClient.invalidateQueries(["/hashtag", "/posts"]);
          queryClient.invalidateQueries([`/posts`]);
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            throw error;
          }
        },
      }
    );
  }, [userData?.id, post.id]);

  const onClickUpdatePostModal = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      push(
        getPathname({
          asPath,
          queryPage,
          queryString: `modal=updatePost&postId=${post.id} `,
        })
      );
      posDispatch(setPos(window.scrollY));
    },
    [asPath, queryPage, post.id]
  );

  const onClickCommentsModal = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      push(
        getPathname({
          asPath,
          queryPage,
          queryString: `modal=comments&postId=${post.id} `,
        })
      );
      posDispatch(setPos(window.scrollY));
    },
    [asPath, queryPage, getPathname]
  );

  return {
    onClickAddLike,
    onClickCommentsModal,
    onClickUnLike,
    onClickDeletePost,
    onClickDeletePostModal,
    onClickUpdatePostModal,
    userData,
    likeCount,
    commentCount,
    isLikeUser,
    isMyPost,
    push,
  };
};

export default usePostBottomBar;
