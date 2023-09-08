import { useSelector } from "@/common/store";
import { Modal } from "@/components/Atomic/Molecules/Modal";
import classNames from "classnames";
import { useRouter } from "next/router";
import React from "react";
import Post from "../../Post";
import useQueryGetPostByPostId from "@/hooks/queries/useQueryGetPostByPostId";
import PostImages from "@/components/Atomic/Atoms/PostImages";
import Comment from "@/components/Atomic/Molecules/Comment";
import Editor from "@/components/Atomic/Atoms/Editor/index.editor";
import Spinner from "@/components/Atomic/Atoms/Spinner";
import CommentEditor from "@/components/Atomic/Molecules/CommentEditor";

const CommentsModal = () => {
  const { pos } = useSelector((state) => state.pos);
  const { query, back, push, pathname } = useRouter();
  const { data: postData, isSuccess } = useQueryGetPostByPostId(
    query.postId as string
  );
  const onClickModal = () => {
    push(`/${pathname}?modal=image&postId=${query.postId}`);
  };
  const onClose = () => {
    back();
  };

  return (
    <div
      className={classNames({
        "opacity-0 invisible": query.modal !== "comments",
        "opacity-100 visible": query.modal == "comments",
      })}
      style={{
        top: pos,
      }}
    >
      <Modal onClose={onClose} isTop={true} scrollAuto={true}>
        {isSuccess && (
          <>
            <div className={classNames("flex flex-col text-base w-full ")}>
              <div className={classNames("pb-10")}>
                <Post post={postData as Post} isBottom={false}>
                  {postData?.img && (
                    <PostImages post={postData!} onClickModal={onClickModal} />
                  )}
                </Post>
              </div>
              <div className={classNames("border-b-[1px]")}>
                <CommentEditor />
              </div>
              <Comment post={postData as Post} />
              <Comment post={postData as Post} />
              <Comment post={postData as Post} />
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default CommentsModal;
