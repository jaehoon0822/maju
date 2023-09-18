import React, { ReactNode, memo } from "react";
import classNames from "classnames";
import { Post } from "@/common/types/index.types";
import usePost from "@/hooks/custom/usePost";
import PostTopbar from "../../Atoms/PostTopbar";
import PostBottomBar from "../../Atoms/PostBottomBar";
import Avatar from "../../Atoms/Avator";

const Post = ({
  post,
  children,
  isComment = false,
  isBottom = true,
}: {
  post: Post;
  children: ReactNode;
  isBottom?: boolean;
  isComment?: boolean;
}) => {
  const { isProfile, query } = usePost();

  return (
    <div
      key={post.id}
      className={classNames(
        "pt-10 flex justify-center border-solid border-b-[1px] border-[#d2d2d2] px-4 py-4 text-base",
        {
          "hover:bg-gray-50": !query.modal,
        }
      )}
    >
      {/* 아바타: comment page 가 아니면 활성화 */}
      {!isComment ? (
        <div
          className={classNames(
            "w-[10%] mr-4 relative transition-opacity md:w-[10%] pt-1 sm:w-0 h-full br-4"
          )}
        >
          <Avatar user={post.user} disableLink={isProfile} />
        </div>
      ) : null}

      <div className="min-h-[10rem] w-full md:w-[400px] sm:[100px]">
        {/* postTopbar: comment page 가 아니면 활성화 */}
        {!isComment ? <PostTopbar post={post} /> : null}
        <div
          className={classNames("pb-5 sm:w-full")}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* post 자식 컴포넌트 */}
        {children}

        {/* postBottomBar: isBottom 이 ture 이면 활성화 */}
        {isBottom ? <PostBottomBar post={post} /> : null}
      </div>
    </div>
  );
};

export default memo(Post);
