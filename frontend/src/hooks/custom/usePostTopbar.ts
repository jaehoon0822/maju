import { useCallback, useEffect, useMemo, useRef } from "react";
import { AxiosError } from "axios";
import { Post } from "@/common/types/index.types";
import useQueryGetUser from "../queries/useQueryGetUser";
import { useQueryClient } from "@tanstack/react-query";
import useMutationFollow from "../mutations/useMutationFollow";
import useMutationUnFollow from "../mutations/useMutationUnFollow";
import { useDispatch, useSelector } from "@/common/store";
import { setPostActiveIconId } from "@/common/store/slices/postActiveIconId";

const usePostTopbar = (post: Post) => {
  const { data: userData } = useQueryGetUser();
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { id: postActiveIconId } = useSelector(
    (state) => state.posActiveIconId
  );
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

  const onClickActiveIconId = (id: string) => {
    if (id === postActiveIconId) {
      dispatch(setPostActiveIconId(null));
    } else {
      dispatch(setPostActiveIconId(id));
    }
  };

  // 모달 외의 영역 클릭 시 모달 닫기
  const handleOutsideClick = (e: Event) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      dispatch(setPostActiveIconId(null));
    }
  };

  useEffect(() => {
    const handleDocumentClick = (e: Event) => {
      if (postActiveIconId === post.id) {
        handleOutsideClick(e);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [postActiveIconId, post]);

  return {
    postActiveIconId,
    modalRef,
    userData,
    isMyPost,
    onClickFollow,
    onClickUnFollow,
    onClickActiveIconId,
  };
};

export default usePostTopbar;
