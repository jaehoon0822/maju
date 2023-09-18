import classNames from "classnames";
import { PostTopbarProps } from "./PostTopbar.type";
import PostDate from "../PostDate";
import Button from "../Button";
import usePostTopbar from "@/hooks/custom/usePostTopbar";
import { memo, useMemo } from "react";

const PostTopbar = ({ post }: PostTopbarProps) => {
  const { isMyPost, onClickFollow, onClickUnFollow } = usePostTopbar(post);
  return (
    <div className={classNames("flex justify-start align-center pb-5")}>
      <div className={classNames("flex")}>
        <span className={classNames("-mt-[2px] pr-6 text-blue-500 font-bold")}>
          {post.user.nick}
        </span>
        <PostDate post={post} />
      </div>
      {!isMyPost ? (
        <div className={classNames("ml-auto w-[20%] md:w-fit")}>
          <Button
            label={useMemo(
              () => (post.isFollower ? "언팔로우" : "팔로우"),
              [post.isFollower]
            )}
            size="medium"
            variant={useMemo(
              () => (post.isFollower ? "warn" : "follow"),
              [post.isFollower]
            )}
            onClick={useMemo(
              () => (post.isFollower ? onClickUnFollow : onClickFollow),
              [post.isFollower]
            )}
          />
        </div>
      ) : null}
    </div>
  );
};

export default memo(PostTopbar);
