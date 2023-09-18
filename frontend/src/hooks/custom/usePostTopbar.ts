import { useCallback, useMemo } from "react";
import { AxiosError } from "axios";
import { Post } from "@/common/types/index.types";
import useQueryGetUser from "../queries/useQueryGetUser";
import { useQueryClient } from "@tanstack/react-query";
import useMutationFollow from "../mutations/useMutationFollow";
import useMutationUnFollow from "../mutations/useMutationUnFollow";

const usePostTopbar = (post: Post) => {
  const { data: userData } = useQueryGetUser();
  const queryClient = useQueryClient();
  const followMutation = useMutationFollow();
  const unFollowMutation = useMutationUnFollow();
  const isMyPost = useMemo(
    () => userData?.id === post.user.id,
    [post.user.id, userData?.id]
  );
  const onClickFollow = useCallback(() => {
    followMutation.mutate(
      { postUserId: post.user.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["/posts"]);
          queryClient.invalidateQueries(["/hashtag", "/posts"]);
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            throw error;
          }
        },
      }
    );
  }, [post.user.id]);
  const onClickUnFollow = useCallback(() => {
    unFollowMutation.mutate(
      { postUserId: post.user.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["/posts"]);
          queryClient.invalidateQueries(["/hashtag", "/posts"]);
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            throw error;
          }
        },
      }
    );
  }, [post.user.id]);
  return {
    userData,
    isMyPost,
    onClickFollow,
    onClickUnFollow,
  };
};

export default usePostTopbar;
