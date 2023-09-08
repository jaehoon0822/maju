import React, { ReactNode } from "react";
import PostAvator from "../../Molecules/PostAvator";
import PostTopbar from "../../Atoms/PostTopbar";
import PostButtomBar from "../../Atoms/PostBottomBar";
import classNames from "classnames";
import { Post } from "@/common/types/index.types";
import usePost from "@/hooks/custom/usePost";

const Post = ({
  post,
  children,
  isBottom = true,
}: {
  post: Post;
  children: ReactNode;
  isBottom?: boolean;
}) => {
  const { userData, onClickPost } = usePost();

  return (
    <div
      key={post.id}
      onClick={onClickPost}
      className={classNames(
        "pt-10 flex justify-center border-solid border-b-[1px] border-[#d2d2d2] px-4 py-4 text-base",
        {
          "hover:bg-gray-50 cursor-pointer": post.user.id == userData?.id,
        }
      )}
    >
      <PostAvator post={post} />
      <div className=" w-[688px] md:w-[400px] sm:w-full">
        <PostTopbar post={post} />
        <div
          className={classNames("pb-5 w-[60%] sm:w-full")}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {children}
        {isBottom ? <PostButtomBar post={post} /> : null}
      </div>
    </div>
  );
};

export default Post;
