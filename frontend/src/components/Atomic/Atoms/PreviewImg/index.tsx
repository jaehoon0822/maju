import { imageLoader } from "@/common/utils/imageLoader";
import classNames from "classnames";
import { OnLoadingComplete } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import ImageNotSupport from "@mui/icons-material/ImageNotSupported";
import React, { memo, useEffect, useRef, useState } from "react";
import Spinner from "../Spinner";

interface PreveiwImgProps {
  img: string;
  type: "coverImage" | "avatar" | "post";
}

interface ImageSize {
  width: number;
  height: number;
}

const PreviewImg = ({ img, type }: PreveiwImgProps) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageSize, setImageSize] = useState<ImageSize>({
    width: 0,
    height: 0,
  });

  const onLoadingComplateHandler: OnLoadingComplete = (img) => {
    setIsLoading(false);
    setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
  };

  const onErrorHandler = () => {
    if (retryCount < 3) {
      setIsLoading(true);
      setTimeout(() => {
        if (imageRef.current) {
          imageRef.current.src = `${type}/${img}`;
          setRetryCount((prev) => prev + 1);
        }
      }, 1500);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={classNames(
        "flex justify-center items-center relative h-screen -translate-x-1/2 -translate-y-1/2 left-[50vw] top-[50vh]"
      )}
      style={{
        width: imageSize.width,
      }}
    >
      {retryCount < 3 ? (
        <Image
          ref={imageRef}
          src={`${type}/${img}`}
          width={imageSize.width}
          height={imageSize.height}
          sizes="(min-width:1200px) 1200px, (max-width:1200px) 960px (max-width:960px) 576px (max-width:576px) 100vw"
          loader={imageLoader}
          alt={img}
          className={classNames("object-contain transition-all", {
            "opacity-0 invisible": isLoading,
            "opacity-100 visible": !isLoading,
          })}
          onLoadingComplete={onLoadingComplateHandler}
          onError={onErrorHandler}
        />
      ) : null}
      {isLoading && retryCount < 3 ? (
        <div className="flex justify-center items-center fixed bg-black/70 w-screen h-screen animate-fadeIn">
          <div className="relative bottom-20">
            <div className="absolute w-max -left-12 bottom-4">
              <span className="text-white block">이미지 불러오는중...</span>
            </div>
            <Spinner color="white" isLoading={isLoading} />
          </div>
        </div>
      ) : null}
      {retryCount >= 3 ? (
        <div className="flex justify-center items-center fixed bg-black/70 w-screen h-screen animate-fadeIn">
          <div className="relative right-20">
            <div className="absolute flex justify-center items-center flex-col w-max left-[-10px] bottom-4">
              <span className="text-white block pb-4">
                이미지를 불러올수 없습니다.
              </span>
              <ImageNotSupport className="text-white" fontSize="large" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default memo(PreviewImg);
