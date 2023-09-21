import classNames from "classnames";
import Image from "next/image";
import React, { memo, useEffect, useRef, useState } from "react";

interface PreveiwImgProps {
  img: string;
  type: "coverImage" | "avatar" | "post";
}

interface ImageSize {
  width: number;
}

const PreviewImg = ({ img, type }: PreveiwImgProps) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageSize, setImageSize] = useState<ImageSize>({
    width: 0,
  });

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.onload = () => {
        const width = imageRef.current!.naturalWidth;
        setImageSize({
          width,
        });
      };
    }
  }, [img]);

  return (
    <div
      className={classNames(
        "relative -translate-x-1/2 -translate-y-1/2 left-[50vw] top-[50vh]",
        {
          "w-[300px] h-[300px] ": imageSize.width < 300,
          "w-[600px] h-screen md:w-[100vw] md:h-[100vh] sm:w-[100vw] sm:h-[100vh]":
            imageSize.width < 500,
          "w-[1000px] h-screen md:w-[600px] sm:w-[100vw] sm:h-[100vh]":
            imageSize.width > 500,
        }
      )}
    >
      <Image
        ref={imageRef}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/${type}/${img}`}
        fill
        sizes="lg:100vw md:80vw sm:40vw"
        alt={img}
        className={classNames("object-contain")}
      />
    </div>
  );
};

export default memo(PreviewImg);
