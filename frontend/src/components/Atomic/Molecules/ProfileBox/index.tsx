import useProfileBox from "@/hooks/custom/useProfileBox";
import CoverImage from "../../Atoms/CoverImage";
import { Post, User } from "@/common/types/index.types";
import Avatar from "../../Atoms/Avator";
import classNames from "classnames";
import Button from "../../Atoms/Button";
import Spinner from "../../Atoms/Spinner";
import { memo } from "react";

// post 의 user 및 현재 사용자의 user 를 props 로 받음
const ProfileBox = ({
  user,
  isFollower,
}: {
  user: User;
  isFollower?: Post["isFollower"];
}) => {
  // useProfile hook 호출
  const {
    isComment,
    isLoading,
    isMe,
    isProfile,
    onClickUpdateProfile,
    onClickFollow,
    onClickUnFollow,
  } = useProfileBox(user);

  //loding 중이라면 Spinner 리턴
  if (isLoading) {
    return (
      <div>
        <Spinner isLoading={isLoading} />
      </div>
    );
  }

  console.log("nick data", user);

  return (
    <div className={classNames("w-full")}>
      {/*  coverImage */}
      <div>
        <CoverImage user={user} />
      </div>
      <div className={classNames("relative m-auto px-20 pt-10 sm:px-4")}>
        {/* Avatar Image */}
        <div
          className={classNames(
            "absolute -top-20 flex bg-white p-1 rounded-full"
          )}
        >
          <Avatar user={user} size="L" disableLink={isProfile} />
        </div>
        {/* Main 컨텐츠 영역 */}
        <div className={classNames("flex pt-2 sm:flex-col")}>
          <div className={classNames("pb-4")}>
            {/* 닉네임과 이메일 박스 */}
            <div className={classNames("pl-4 pb-2")}>
              {/* user 의 닉네임 */}
              <span className={classNames("text-2xl font-bold")}>
                {user.nick}
              </span>
            </div>
            {/* user 의 이메일 */}
            <div className={classNames("pl-4 pb-2")}>
              <span
                className={classNames("text-base font-semibold text-[#828282]")}
              >
                {user.email}
              </span>
            </div>
            {/* coverLetter 영역 */}
            <div className={classNames("pl-4")}>
              <span
                className={classNames("text-base text-[#828282]")}
                dangerouslySetInnerHTML={{
                  __html: user.profile?.coverLetter ?? "",
                }}
              />
            </div>
          </div>
          {/* 팔로우 버튼 */}
          {/* 자신의 profile 이 아니라면 팔로우 가능 아니면 null */}
          {!isMe && isComment ? (
            <div className={classNames("ml-auto sm:m-auto sm:w-full")}>
              <Button
                label={isFollower ? "언팔로우" : "팔로우"}
                variant={isFollower ? "warn" : "follow"}
                onClick={isFollower ? onClickUnFollow : onClickFollow}
                size="medium"
              />
            </div>
          ) : null}
          {isMe && !isComment ? (
            <div
              className={classNames("ml-auto md:w-[20%] sm:m-auto sm:w-full")}
            >
              <Button
                label="수정"
                size="medium"
                variant="follow"
                onClick={onClickUpdateProfile}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default memo(ProfileBox);
