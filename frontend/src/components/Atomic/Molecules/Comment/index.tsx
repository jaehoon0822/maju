import React from "react";
import PostTopbar from "../../Atoms/PostTopbar";
import PostAvator from "../PostAvator";
import classNames from "classnames";
import { Post } from "@/common/types/index.types";

interface CommentProps {
  post: Post;
}

const Comment = ({ post }: CommentProps) => {
  return (
    <div
      className={classNames(
        "flex justify-center py-4 px-4 m-auto border-b-[1px] w-full"
      )}
    >
      <div
        className={classNames(
          "relative flex w-full justify-start items-center pb-4"
        )}
      >
        <PostAvator post={post} />
        <div className="w-full">
          <div className={classNames("border-b-[1px]")}>
            <PostTopbar post={post} />
          </div>
          <div className={classNames("w-[60%] sm:w-full")}>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
            <p>aaaa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
