import React, { memo, useMemo } from "react";
import { Post } from "@/common/types/index.types";
import { getDateTime } from "@/common/utils/getDateTime";
import classNames from "classnames";

const PostDate = ({ post }: { post: Post }) => {
  const date = useMemo(() => getDateTime(post.createdAt), [post.createdAt]);
  return (
    <div>
      <span className={classNames("text-gray-500 pr-1 sm:text-sm")}>
        {date[0]}
      </span>
      <span className={classNames("text-gray-500 pr-1 sm:text-sm")}>
        {date[1]}
      </span>
      <span className={classNames("text-gray-500 pr-1 sm:text-sm")}>
        {date[2]}
      </span>
    </div>
  );
};

export default memo(PostDate);
