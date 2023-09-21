import { useDispatch, useSelector } from "@/common/store";
import { Modal } from "@/components/Atomic/Molecules/Modal";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { memo, useEffect, useRef } from "react";
import useQueryGetPostByPostId from "@/hooks/queries/useQueryGetPostByPostId";
import PostImages from "@/components/Atomic/Atoms/PostImages";
import Comments from "@/components/Atomic/Molecules/Comments";
import CommentEditor from "@/components/Atomic/Molecules/CommentEditor";
import ProfileBox from "@/components/Atomic/Molecules/ProfileBox";
import Line from "@/components/Atomic/Atoms/Line";
import { SubmitHandler } from "react-hook-form";
import { InferType } from "yup";
import { commentSchema } from "@/common/validation/comment.yup";
import useMutationCreateComment from "@/hooks/mutations/useMutationCreateComment";
import { useQueryClient } from "@tanstack/react-query";
import {
  setCommentModalPos,
  setCommentModalRef,
} from "@/common/store/slices/commentModalPosSlice";
import { Post as PostType } from "@/common/types/index.types";
import Post from "../../Post";

const CommentsModal = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const commentsModalRef = useRef<HTMLDivElement | null>(null);
  const { pos } = useSelector((state) => state.pos);
  const { commentModalPos } = useSelector((state) => state.commentModalpos);
  const { query, back, push, asPath } = useRouter();
  const { data: postData, isSuccess } = useQueryGetPostByPostId(
    query.postId as string
  );
  // comment 생성 mutation
  const mutation = useMutationCreateComment({ postId: postData?.id ?? "" });
  // 앞의 path name 을 가져옴
  // modal 안에서 modal 을 호출하면 pathname 에 modal 이 포함되어
  // path 를 확실하게 뽑아서 설정
  const pathname = asPath.split("?")[0];

  // image 클릭시 image 모달 활성화
  const onClickImageModal = () => {
    if (commentsModalRef.current) {
      dispatch(setCommentModalPos(commentsModalRef.current.scrollTop));
    }
    push(`${pathname}/?modal=image/post&postId=${query.postId}`);
  };

  // CommentModal 클릭시, scroll 위치 지정이후, 뒤로가기
  const onClose = () => {
    window.scrollTo({ top: pos });
    dispatch(setCommentModalPos(0));
    back();
  };

  // comment 생성 submit 핸들러 작성
  const onSubmitCreateComment: SubmitHandler<
    InferType<typeof commentSchema>
  > = (data) => {
    dispatch(setCommentModalPos(commentsModalRef?.current?.scrollTop));
    mutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(["/comments", postData?.id]);
        queryClient.invalidateQueries(["/posts"]);
        queryClient.invalidateQueries(["/hashtag", "/posts"]);
      },
      onError: (error) => {
        if (error instanceof Error) {
          throw error;
        }
      },
    });
  };

  useEffect(() => {
    dispatch(setCommentModalRef(commentsModalRef.current));
  }, [dispatch, commentsModalRef]);

  useEffect(() => {
    if (commentsModalRef) {
      commentsModalRef.current?.scrollTo({ top: commentModalPos });
    }
  }, [commentModalPos]);

  return (
    <div
      className={classNames({
        "opacity-0 invisible": query.modal !== "comments",
        "opacity-100 visible": query.modal == "comments",
      })}
    >
      <Modal
        modalRef={commentsModalRef}
        id="commentModal"
        onClose={onClose}
        isTop={true}
        scrollAuto={true}
      >
        <div
          className={classNames("w-full", {
            "left-0 opacity-100": query.modal,
            "-left-[200px] opacity-0": !query.modal,
          })}
        >
          {isSuccess && (
            <>
              <ProfileBox
                user={postData!.user}
                isFollower={postData!.isFollower}
              />
              <div className={classNames("flex flex-col text-base w-full ")}>
                <div className={classNames("pb-4")}>
                  <Line />
                  <Post
                    post={postData as PostType}
                    isBottom={false}
                    isComment={true}
                  >
                    {postData?.img && (
                      <PostImages
                        post={postData!}
                        onClickModal={onClickImageModal}
                      />
                    )}
                  </Post>
                </div>
                <div className={classNames("border-b-[1px]")}>
                  <CommentEditor onSubmit={onSubmitCreateComment} />
                </div>
                <Comments post={postData as PostType} />
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default memo(CommentsModal);
