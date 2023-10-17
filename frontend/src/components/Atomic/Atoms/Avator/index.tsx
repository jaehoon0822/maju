import Image from "next/image";
import classNames from "classnames";
import PhotoSizeSelectIcon from "@mui/icons-material/PhotoSizeSelectActual";
import { AvatarProps } from "./Avatar.type";
import useAvatar from "@/hooks/custom/useAvatar";
import { memo, useMemo } from "react";
import Spinner from "../Spinner";

const Avatar = ({
  user,
  size = "SM",
  isEdit = false,
  disableLink = false,
  setIsLoading,
  useFormReturn,
}: AvatarProps) => {
  const {
    onChange,
    onClickEditProfile,
    onClickPushProfile,
    onError,
    onLoadingComplete,
    img,
    src,
    blurData,
    isLoading,
    inputRef,
  } = useAvatar({
    user,
    useFormReturn,
    size,
    setIsAvatarLoading: setIsLoading,
  });

  // 아바타 이미지 사이즈
  const avatarSize = useMemo(
    () => ({
      SM: "w-10 h-10",
      M: "w-20 h-20 sm:w-16 sm:h-16",
      L: "w-28 h-28 sm:w-20 sm:h-20",
    }),
    []
  );

  // console.log("Avatar src: ", src);

  return (
    <div aria-label="avatar">
      <div
        onClick={useMemo(
          () =>
            isEdit
              ? onClickEditProfile
              : !disableLink
              ? onClickPushProfile
              : undefined,
          [isEdit, disableLink]
        )}
        className={classNames(
          "relative group p-2 rounded-full flex justify-center items-center outline-white outline-4",
          avatarSize[size],
          {
            "bg-[#6ea6c0]": !img,
            "bg-none": img,
            "cursor-pointer": !disableLink,
          }
        )}
      >
        {img ? (
          //  image 가 있다면, 해당 image 를 보여줌
          <>
            <div>
              <Image
                key={src}
                fill
                src={src}
                alt={`${user?.nick}님의 이미지`}
                sizes="lg:100vw"
                onLoadingComplete={onLoadingComplete}
                onError={onError}
                loading="lazy"
                placeholder="blur"
                blurDataURL={blurData}
                className={classNames(
                  "duration-100 rounded-full object-cover object-center transition-all",
                  {
                    "scale-100 blur-sm grayscale opacity-0": isLoading,
                    "blur-0 grayscale-0": !isLoading,
                  }
                )}
              />
            </div>
            <div
              className={classNames(
                "opacity-0 transition-all scale-110 relative flex justify-center items-center",
                {
                  "w-full h-full opacity-100 rounded-full blur-[3px] bg-gradient-to-br from-gray-200 to-gray-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2":
                    isLoading,
                }
              )}
            >
              <Spinner isLoading={isLoading} size={15} />
            </div>
          </>
        ) : (
          // image 가 없다면, user.nick 의 첫번째 문자를 보여줌
          <span
            className={classNames(" text-white relative bottom-[1px]", {
              "text-4xl": size === "L",
              invisible: isEdit,
            })}
          >
            {src ? null : user?.nick.slice(0, 1)}
          </span>
        )}
        {/* isEdit 이 true 이면, 수정가능하도록 처리, 아니면 null */}
        {isEdit ? (
          <>
            {/* backdrop */}
            <div
              className={classNames(
                "absolute transition-all top-0 rounded-full group-hover:bg-black/50",
                avatarSize[size]
              )}
            >
              {!img ? (
                // 이미지가 없다면, photoSelectIcon 이 있는 이미지를 보여줌
                <PhotoSizeSelectIcon
                  className={classNames(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
                  )}
                />
              ) : (
                // 이미지가 있다면, hover 시에만 photoSelectIcon 이 있는 이미지를 보여줌
                <PhotoSizeSelectIcon
                  className={classNames(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white invisible group-hover:visible group-hover:animate-fadeIn"
                  )}
                />
              )}
            </div>
            {/* 이미지 인풋 */}
            <input
              className={classNames("hidden")}
              name="avatar"
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={onChange}
            />
          </>
        ) : (
          // backdrop
          <div
            className={classNames(
              "absolute transition-all top-0 rounded-full",
              avatarSize[size],
              {
                "group-hover:bg-black/50": !disableLink,
              }
            )}
          ></div>
        )}
      </div>
    </div>
  );
};

export default memo(Avatar);
