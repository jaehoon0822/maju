import classNames from "classnames";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface PreveiwImgProps {
  img: string;
}

interface ImageSize {
  width: number;
  height: number;
}

const PreviewImg = ({ img }: PreveiwImgProps) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageSize, setImageSize] = useState<ImageSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.onload = () => {
        const width = imageRef.current!.naturalWidth;
        const height = imageRef.current!.naturalHeight;

        setImageSize({
          width,
          height,
        });
      };
    }
  });

  return (
    <div
      className={classNames(
        "relative -translate-x-1/2 -translate-y-1/2 left-1/2 top-[50vh]",
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
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/${img}`}
        fill
        alt={img}
        className={classNames("object-contain")}
      />
    </div>
  );
};

export default PreviewImg;
