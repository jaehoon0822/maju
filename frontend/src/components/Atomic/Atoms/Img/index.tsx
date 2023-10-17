import { MouseEvent, useEffect } from "react";
import classNames from "classnames";
import Image from "next/image";
import PhotoSizeSelectIcon from "@mui/icons-material/PhotoSizeSelectActual";
import ImageNotSupportIcon from "@mui/icons-material/ImageNotSupported";
import useImg from "@/hooks/custom/useImg";
import Spinner from "../Spinner";

const Img = ({
  img,
  isHover = true,
  onClick,
  col = "w-full",
}: {
  img: string;
  isHover?: boolean;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  col?: "w-1/2" | "w-full";
}) => {
  const {
    imgRef,
    imageBlur,
    imageUrl,
    isLoading,
    onErrorHanlder,
    onLoadignComplateHandler,
    retryCount,
  } = useImg({ img });

  return (
    <div
      className={classNames(
        "group relative h-40 md:h-40 animate-fadeIn cursor-pointer",
        col,
        {
          "mb-10": isHover,
          "mb-0": !isHover,
          "h-40": col === "w-1/2",
          "h-80": col === "w-full",
        }
      )}
      onClick={onClick}
    >
      {retryCount < 3 ? (
        <>
          <Image
            key={imageUrl}
            src={imageUrl}
            alt={img}
            ref={imgRef}
            fill
            loading="lazy"
            sizes="lg:100vw md:80vw sm:40vw"
            blurDataURL={imageBlur}
            placeholder="blur"
            onLoadingComplete={onLoadignComplateHandler}
            onError={onErrorHanlder}
            className={classNames(
              "object-left pr-2 pt-2",
              "object-cover rounded-xl transition-all",
              {
                "scale-100 blur-sm grayscale": isLoading,
                "scale-100 blur-0 grayscale-0": !isLoading,
              }
            )}
          />
          {isHover && !isLoading ? (
            <div
              className={classNames(
                "absolute transition-opacity",
                "w-full h-full",
                "bg-black bg-opacity-50",
                "group-hover:opacity-100 group-focus:opacity-100 opacity-0",
                "translate-y-2 rounded-xl cursor-pointer"
              )}
              style={{
                width: "calc(100% - 8px)",
                height: "calc(100% - 8px)",
              }}
            >
              <span
                className={classNames(
                  "font-bold text-white block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute"
                )}
              >
                <PhotoSizeSelectIcon />
              </span>
            </div>
          ) : null}
          <div
            className={classNames(
              "absolute top-0 flex justify-center items-center w-full h-full",
              {
                "blur-sm bg-gray-100 scale-105 opacity-100": isLoading,
                "opacity-0": !isLoading,
              }
            )}
          >
            <Spinner isLoading={isLoading} color="#3f3f3f" />
          </div>
        </>
      ) : (
        <div className="relative w-full h-full">
          <div className="w-full h-full bg-gradient-to-t from-gray-100 to-slate-100 rounded-xl blur-md"></div>
          <div className="absolute flex flex-col justify-center items-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            <ImageNotSupportIcon className="text-gray-400 mb-1" />
            <span className="text-center text-gray-400">
              이미지를 가져오지 못했습니다.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Img;
