import classNames from "classnames";
import Image from "next/image";
import PhotoSizeSelectIcon from "@mui/icons-material/PhotoSizeSelectActual";
import { User } from "@/common/types/index.types";
import useCoverImage from "@/hooks/custom/useCoverImage";
import { Dispatch, SetStateAction, memo } from "react";
import Spinner from "../Spinner";
import { UseFormReturn } from "react-hook-form";

const CoverImage = ({
  user,
  isEdit = false,
  setIsLoading,
  useFormReturn,
}: {
  user?: User;
  onClick?: () => void;
  isEdit?: boolean;
  useFormReturn?: UseFormReturn;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    image,
    dataUrl,
    imageUrl,
    inputRef,
    onError,
    onChange,
    onLoadingComplete,
    onClickEdit,
    onClickPreviewImage,
    isLoading,
    retryCount,
  } = useCoverImage({
    user,
    useFormReturn,
    setIsCoverImageLoading: setIsLoading,
  });

  return (
    // isEdit 에 의한 onClick 이벤트 활성화 및 비활성화
    <div
      onClick={isEdit ? onClickEdit : onClickPreviewImage}
      className={classNames("relative w-full h-48 cursor-pointer group")}
    >
      {/* coverImage 가 있다면, user 의 coverImage 를 보여줌 */}
      {image && retryCount <= 10 ? (
        // image/* 으로 시작하는지 확인
        <>
          <Image
            // width 값에 따른 imageUrl
            src={imageUrl}
            // placeholder 는 blur
            placeholder="blur"
            // placeholder 에 표시될 blurDataURL
            blurDataURL={dataUrl}
            // iamge alt
            alt={`${user?.nick}님의 배경이미지`}
            // onLoadingComplate
            onLoadingComplete={onLoadingComplete}
            // onError
            onError={onError}
            // image sizes
            sizes="lg:100vw md:80vw sm:40vw"
            className={classNames("object-cover object-center", {
              "scale-100 blur-sm grayscale": isLoading,
              "scale-100 blur-0 grayscale-0": !isLoading,
            })}
            // layout style: fill
            fill
          />
          <div
            className={classNames(
              "h-full w-full duration-100 opacity-0 transition-all relative scale-[103%] flex justify-center items-center",
              {
                "opacity-100 rounded-xl blur-sm bg-gradient-to-br from-gray-200 to-gray-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2":
                  isLoading,
              }
            )}
          >
            <Spinner isLoading={isLoading} />
          </div>
        </>
      ) : (
        // 그렇지 않다면, default 배경이미지를 보여줌
        <div className={classNames("bg-blue-300 w-full h-full")}></div>
      )}
      {/* isEdit 이 true 이면 backdrop 활성화 */}
      {isEdit && !isLoading ? (
        // backdrop
        <div>
          <div
            className={classNames(
              "absolute w-full h-full top-0 transition-colors group-hover:bg-black/70",
              {
                "bg-none": image,
                "bg-black/50": !image,
              }
            )}
          >
            <PhotoSizeSelectIcon
              className={classNames(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white  group:animate-fadeIn",
                {
                  "invisible group-hover:visible group-hover:animate-fadeIn":
                    image,
                  visible: !image,
                }
              )}
            />
          </div>
          {/* file 의 onChange 를 실행할 input */}
          <input
            type="file"
            accept="image/*"
            name="coverImage"
            onChange={onChange}
            ref={inputRef}
            className={classNames("hidden")}
          />
        </div>
      ) : !isLoading ? (
        <div
          className={classNames(
            "absolute w-full h-full top-0 transition-colors group-hover:bg-black/50"
          )}
        >
          <PhotoSizeSelectIcon
            className={classNames(
              "absolute invisible top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white group-hover:visible group-hover:animate-fadeIn "
            )}
          />
        </div>
      ) : null}
    </div>
  );
};

export default memo(CoverImage);
