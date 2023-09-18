import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import useQueryGetUser from "../queries/useQueryGetUser";
import { User } from "@/common/types/index.types";
import useMutationFollow from "../mutations/useMutationFollow";
import useMutationUnFollow from "../mutations/useMutationUnFollow";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useProfileBox = (user: User) => {
  // query 가져오기
  const { push, query, asPath } = useRouter();
  // 현재 로그인한 유저데이터 쿼리
  const { data: userData, isLoading } = useQueryGetUser();
  // 자신의 profile 인지 확인하기 위한 조건식
  const isMe = useMemo(() => userData?.id === user.id, [userData]);
  // comment modal 인지 확인
  const isComment = useMemo(() => query.modal === "comments", [query.modal]);
  // profile page 인지 확인
  const isProfile = useMemo(() => asPath.startsWith("/profile"), [asPath]);
  // pathname 추출
  const pathname = useMemo(() => asPath.split("?")[0], [asPath]);
  // queryClient
  const queryClient = useQueryClient();
  // followMutation
  const followMutation = useMutationFollow();
  // unFollowMutation
  const unFollowMutation = useMutationUnFollow();
  // profile update 모달 활성화
  const onClickUpdateProfile = useCallback(() => {
    push(`${pathname}?modal=registProfile&userId=${user.id}`);
  }, [user]);
  // follow 클릭 이벤트
  const onClickFollow = useCallback(() => {
    followMutation.mutate(
      { postUserId: user.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["/posts"]);
          queryClient.invalidateQueries(["/hashtags", "/posts"]);
          queryClient.invalidateQueries(["/post"]);
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            throw error;
          }
        },
      }
    );
  }, [user]);
  // unFollow 클릭 이벤트
  const onClickUnFollow = useCallback(() => {
    unFollowMutation.mutate(
      { postUserId: user.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["/posts"]);
          queryClient.invalidateQueries(["/hashtags", "/posts"]);
          queryClient.invalidateQueries(["/post"]);
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            throw error;
          }
        },
      }
    );
  }, [user]);

  return {
    isMe,
    isComment,
    isProfile,
    isLoading,
    onClickUpdateProfile,
    onClickFollow,
    onClickUnFollow,
    userData,
  };
};

export default useProfileBox;
