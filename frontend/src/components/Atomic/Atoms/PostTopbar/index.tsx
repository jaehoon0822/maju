import classNames from "classnames";
import { PostTopbarProps } from "./PostTopbar.type";
import PostDate from "../PostDate";

const PostTopbar = ({ post }: PostTopbarProps) => {
  return (
    <div className={classNames("flex justify-start align-center pb-5")}>
      <span className={classNames("-mt-[2px] pr-6 text-blue-500 font-bold")}>
        {post.user.nick}
      </span>
      <PostDate post={post} />
    </div>
  );
};

export default PostTopbar;
