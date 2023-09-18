import React, { memo, useState } from "react";
import CommentEditor from "../../Molecules/CommentEditor";
import classNames from "classnames";
import { Comment } from "@/common/types/index.types";
import useQueryGetUser from "@/hooks/queries/useQueryGetUser";
import Button from "../Button";
import Avatar from "../Avator";
import PostDate from "../PostDate";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "@/common/store";
import { setCommentModalPos } from "@/common/store/slices/commentModalPosSlice";
import useMutationUpdateComment from "@/hooks/mutations/useMutationUpdateComment";
import { SubmitHandler } from "react-hook-form";
import { commentSchemaType } from "@/common/validation/comment.yup";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const Comment = ({ comment }: { comment: Comment }) => {
  const { commentModalRef } = useSelector((state) => state.commentModalpos);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { push, asPath } = useRouter();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { data: userData } = useQueryGetUser();
  const commentUpdateMutation = useMutationUpdateComment({
    commentId: comment.id,
  });
  const pathname = asPath.split("?")[0];
  const onClickEditComment = () => {
    setIsEdit((prev) => !prev);
  };
  const onClickRemoveComment = () => {
    if (comment.id) {
      if (commentModalRef) {
        dispatch(setCommentModalPos(commentModalRef.scrollTop));
        push(`${pathname}/?modal=deleteComment&commentId=${comment.id}`);
      }
    }
  };

  const onSubmitUpdateComment: SubmitHandler<commentSchemaType> = (data) => {
    commentUpdateMutation.mutate(
      { ...data, id: comment.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["/comments", comment.post.id]);
          queryClient.invalidateQueries(["/posts"]);
          queryClient.invalidateQueries(["/hashtag", "/posts"]);
          setIsEdit((prev) => !prev);
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            throw error;
          }
        },
      }
    );
  };

  const isMyComment = comment.user.id === userData?.id;

  return (
    <div
      className={classNames("border-b-[1px] w-full", {
        "pt-10 pb-4": isEdit,
        "py-10": !isEdit,
      })}
    >
      <div className={classNames("w-full")}>
        <div>
          {/* post 의 avatar 및 postTobar */}
          <div className={classNames("flex items-center border-b-[1px]")}>
            <div className={classNames("pr-4 -mt-4 sm:-mt-6 sm:pr-2")}>
              <Avatar user={comment.user} />
            </div>
            <div className={classNames("flex justify-start align-center pb-5")}>
              <span
                className={classNames(
                  "pr-6 text-blue-500 font-bold sm:text-sm sm:pr-2 sm:mt-1"
                )}
              >
                {isMyComment ? "작성자" : userData?.nick}
              </span>
              <PostDate post={comment.post} />
            </div>
          </div>
          {/* 컨텐츠 */}
          {isEdit ? (
            // isEdit = ture, editor 활성화
            <CommentEditor
              content={comment.content}
              isEdit={isEdit}
              onSubmit={onSubmitUpdateComment}
              onClickEditComment={onClickEditComment}
            />
          ) : (
            <>
              <div
                className={classNames("p-4 pt-4 mb-4 bg-gray-50 text-gray-800")}
                dangerouslySetInnerHTML={{ __html: comment.content }}
              />
              {isMyComment ? (
                <div className={classNames("flex")}>
                  <div
                    className={classNames("ml-auto w-fit md:w-[20%] sm:w-full")}
                  >
                    <Button
                      label="수정"
                      size="medium"
                      variant="primary"
                      onClick={onClickEditComment}
                    />
                  </div>
                  <div
                    className={classNames("ml-4 w-fit md:w-[20%] sm:w-full")}
                  >
                    <Button
                      label="삭제"
                      size="medium"
                      variant="warn"
                      onClick={onClickRemoveComment}
                    />
                  </div>
                </div>
              ) : null}
            </>
          )}
          {/* 수정 버튼, isEdit = ture 로 editor 활성화 */}
        </div>
      </div>
    </div>
  );
};

export default memo(Comment);
