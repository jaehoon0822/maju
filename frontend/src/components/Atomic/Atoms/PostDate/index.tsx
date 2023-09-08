import { Post } from "@/common/types/index.types";
import { getDateTime } from "@/common/utils/getDateTime";
import classNames from "classnames";
import React from "react";

const PostDate = ({ post }: { post: Post }) => {
  const date = getDateTime(post.createdAt);
  return (
    <div>
      <span className={classNames("text-gray-500 pr-1")}>{date[0]}</span>
      <span className={classNames("text-gray-500 pr-1")}>{date[1]}</span>
      <span className={classNames("text-gray-500 pr-1")}>{date[2]}</span>
    </div>
  );
};

export default PostDate;
