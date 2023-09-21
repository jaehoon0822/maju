import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useSelector } from "@/common/store";
import useQueryGetUser from "../queries/useQueryGetUser";
import useMutationDeleteComment from "../mutations/useMutationDeleteComment";
import useQueryGetCommentById from "../queries/useQueryGetCommentById";
import { AxiosError } from "axios";

const useDeleteCommentModal = () => {
  // query client
  const queryClient = useQueryClient();
  // query 와 back 메서드
  const { query, back } = useRouter();
  // PostModal 의 ref
  const deleteCommentMadalRef = useRef<HTMLDivElement | null>(null);
  // query string 의 commentId
  const commentId = query.commentId as string;
  // 현재 스크롤 포지션
  const { pos } = useSelector((state) => state.pos);
  // userData 가져오기
  const { data: userData } = useQueryGetUser();
  // comment 데이터 가져오기
  const { data: CommentData } = useQueryGetCommentById({
    commentId,
  });
  // deleteComment 뮤테이션 호출
  const deleteCommentMutation = useMutationDeleteComment();
  // 나의 커멘트인지 확인
  const isMyComment = CommentData?.user.id === userData?.id;

  // comment 삭제 버튼클릭시 실행될 이벤트 핸들러
  const onClickDeleteComment = () => {
    deleteCommentMutation.mutate(commentId, {
      onSuccess: () => {
        queryClient.invalidateQueries([`/comments`, CommentData?.post.id]);
        queryClient.invalidateQueries([`/posts`]);
        queryClient.invalidateQueries([`/hashtag`, `/posts`]);
        back();
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          throw error;
        }
      },
    });
  };

  return {
    deleteCommentMadalRef,
    query,
    back,
    pos,
    onClickDeleteComment,
    isMyComment,
  };
};

export default useDeleteCommentModal;
