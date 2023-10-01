import classNames from "classnames";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import CheckIcon from "@mui/icons-material/Check";
import { PostTopbarProps } from "./PostTopbar.type";
import PostDate from "../PostDate";
import usePostTopbar from "@/hooks/custom/usePostTopbar";
import { memo } from "react";
import IconItem from "../IconItem";
import PostMoreModal from "../../Organisms/Modal/PostMoreModal";
import ModalItem from "../ModalItem";

const PostTopbar = ({ post }: PostTopbarProps) => {
  const {
    isMyPost,
    modalRef,
    postActiveIconId,
    onClickActiveIconId,
    onClickFollow,
    onClickUnFollow,
  } = usePostTopbar(post);

  return (
    <div
      className={classNames(
        "relative flex justify-start align-center pb-5 sm:pb-6"
      )}
    >
      <div className={classNames("flex mr-auto sm:flex-col")}>
        <div className="relative pr-8 sm:pr-1 sm:w-[130px]">
          <span
            className={classNames(
              "inline-block -mt-[2px] text-blue-500 font-bold sm:pr-2 sm:text-sm"
            )}
          >
            {post.user.nick}
          </span>
          {post.isFollower ? (
            <div
              className={classNames(
                "absolute top-[2px] right-3 flex justify-center items-center p-1 w-4 h-4 mt-1 rounded-full bg-blue-500 ml-4 sm:right-10 sm:top-6"
              )}
            >
              <CheckIcon
                className={classNames("text-white")}
                style={{
                  fontSize: 10,
                }}
              />
            </div>
          ) : null}
        </div>
        <PostDate post={post} />
      </div>
      {!isMyPost ? (
        <div ref={modalRef} className={classNames("ml-auto md:w-fit")}>
          <div className={classNames("-mt-4 sm:-mt-6")}>
            <IconItem
              Icon={MoreHoriz}
              variants="blue"
              onClick={() => onClickActiveIconId(post.id)}
            />
          </div>
          <PostMoreModal
            isActive={postActiveIconId === post.id}
            onClose={() => onClickActiveIconId(post.id)}
          >
            <ModalItem
              Icon={post.isFollower ? PersonRemoveIcon : PersonAddIcon}
              variants={post.isFollower ? "rose" : "blue"}
              title={post.isFollower ? "언팔로우" : "팔로우"}
              onClick={post.isFollower ? onClickUnFollow : onClickFollow}
            />
          </PostMoreModal>
        </div>
      ) : null}
    </div>
  );
};

export default memo(PostTopbar);
