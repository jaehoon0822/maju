import classNames from "classnames";
import Image from "next/image";
import PhotoSizeSelectIcon from "@mui/icons-material/PhotoSizeSelectActual";
import useImg from "@/hooks/custom/useImg";
import { MouseEvent } from "react";

const Img = ({
  img,
  onClick,
}: {
  img: string;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}) => {
  const { imageHeight, imgRef } = useImg();
  return (
    <div
      className={classNames(
        "group relative flex flex-wrap object-contain 1/2 mb-10"
      )}
      onClick={imageHeight > 320 ? onClick : undefined}
    >
      <div className={classNames("relative w-full h-80 md:h-40")}>
        {imgRef.current !== undefined && (
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/post/${img}`}
            alt={img}
            fill
            ref={imgRef}
            sizes="lg:100vw md:80vw sm:40vw"
            className={classNames("object-left pr-2 pt-2", {
              "object-contain": imageHeight < 320,
              "object-cover rounded-xl": imageHeight > 320,
            })}
          />
        )}
      </div>
      {imageHeight < 320 ? (
        <div
          className={classNames(
            "absolute transition-opacity",
            "w-full h-full",
            "bg-black bg-opacity-50",
            "translate-y-2",
            {
              "group-hover:opacity-0 group-active:opacity-0 opacity-0":
                imageHeight < 320,
              "rounded-xl": imageHeight > 320,
            }
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
      ) : (
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
      )}
    </div>
  );
};

export default Img;
