import classNames from "classnames";
import ModeCommentIcon from "@mui/icons-material/ModeCommentOutlined";
import EditNodeIcon from "@mui/icons-material/EditNote";
import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIconFill from "@mui/icons-material/FavoriteOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import IconItem from "../IconItem";
import { Post } from "@/common/types/index.types";
import usePostBottomBar from "@/hooks/custom/usePostBottomBar";

const PostButtomBar = ({ post }: { post: Post }) => {
  const {
    isMyPost,
    isLikeUser,
    likeCount,
    userData,
    onClickDeletePostModal,
    onClickCommentsModal,
    onClickAddLike,
    onClickUnLike,
    onClickUpdatePostModal,
  } = usePostBottomBar(post);

  return (
    <div
      className={classNames(
        "flex justify-center border-t-[1px] border-solid border-[#d2d2d2] w-[688px] md:w-fit z-20"
      )}
    >
      <div className={classNames("group flex items-center sm:flex-col")}>
        <IconItem
          Icon={ModeCommentIcon}
          variants="blue"
          onClick={onClickCommentsModal}
        />
        <span
          className={classNames(
            "group-hover:text-blue-500 group-focus:text-blue-500 -ml-14 md:-ml-10 sm:ml-0 sm:-mt-[.8rem]"
          )}
        >
          0
        </span>
      </div>
      <div className={classNames("group flex items-center sm:flex-col")}>
        <IconItem
          Icon={EditNodeIcon}
          variants="blue"
          onClick={onClickUpdatePostModal}
        />
        <span
          className={classNames(
            "group-hover:text-blue-500 group-focus:text-blue-500 -ml-14 md:-ml-10 sm:ml-0 sm:-mt-[.8rem]"
          )}
        >
          0
        </span>
      </div>
      <div className={classNames("group flex items-center sm:flex-col")}>
        {isLikeUser ? (
          <IconItem
            Icon={FavoriteIconFill}
            variants="rose"
            disabled={isMyPost}
            onClick={isMyPost ? undefined : onClickUnLike}
          />
        ) : (
          <IconItem
            Icon={FavoriteIcon}
            variants="rose"
            disabled={isMyPost}
            onClick={isMyPost ? undefined : onClickAddLike}
          />
        )}
        <span
          className={classNames(
            "group-hover:text-rose-500 group-focus:text-rose-500 -ml-14 md:-ml-10 sm:ml-0 sm:-mt-[.8rem]"
          )}
        >
          {likeCount}
        </span>
      </div>
      {post.user.id === userData?.id ? (
        <div className={classNames("flex items-center sm:flex-col")}>
          <IconItem
            Icon={DeleteIcon}
            variants="red"
            onClick={onClickDeletePostModal}
          />
        </div>
      ) : null}
    </div>
  );
};

export default PostButtomBar;
