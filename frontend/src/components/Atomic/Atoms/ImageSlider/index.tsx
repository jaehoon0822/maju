import React, { ReactNode } from "react";
import LeftArrowIcon from "@mui/icons-material/ArrowLeft";
import RightArrowIcon from "@mui/icons-material/ArrowRight";
import classNames from "classnames";
import useImageSlider from "@/hooks/custom/useImageSlider";
import { Img } from "@/common/types/index.types";

const ImageSlider = ({
  children,
  img,
}: {
  children: ReactNode;
  img: Img[];
}) => {
  const { imagePosition, onClickNext, onClickPrev, idx, pos } =
    useImageSlider(img);
  return (
    <div>
      <div
        className="absolute text-white left-10 z-50"
        style={{
          top: `calc(${pos}px + 50%)`,
        }}
      >
        <button
          className={classNames(
            "p-2 rounded-full border-solid border-[1px] transition-all bg-black bg-opacity-60 hover:bg-black hover:bg-opacity-25 tourch:bg-black touch:bg-opacity-25 active:translate-y-1",
            {
              "opacity-0 invisible":
                img.length == 1 || idx === 0 || idx === null,
            }
          )}
          onClick={onClickPrev}
        >
          <LeftArrowIcon />
        </button>
      </div>
      <div
        className={classNames(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
        )}
        style={{
          top: pos === 0 ? 0 : pos ? pos : "50%",
        }}
      >
        <div className="relative flex overflow-hidden h-screen w-[99vw] top-[100vh] -translate-y-1/2">
          <div
            className={classNames("relative flex transition-all")}
            style={{
              transform: imagePosition,
            }}
          >
            {children}
          </div>
        </div>
      </div>
      <div
        className={classNames("absolute text-white right-10 z-50 ", {
          "opacity-0 invisible":
            (img && img?.length === 1) || (img && img?.length - 1 === idx!),
        })}
        style={{
          top: `calc(${pos}px + 50%)`,
        }}
      >
        <button
          className={classNames(
            "p-2 rounded-full border-solid border-[1px] transition-all bg-black bg-opacity-60 hover:bg-black hover:bg-opacity-25 tourch:bg-black touch:bg-opacity-25 active:translate-y-1"
          )}
          onClick={onClickNext}
        >
          <RightArrowIcon />
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
