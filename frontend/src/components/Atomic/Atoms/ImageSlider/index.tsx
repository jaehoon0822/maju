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
  const { imagePosition, onClickNext, onClickPrev, idx } = useImageSlider(img);
  return (
    <div>
      <div className="absolute text-white top-[50vh] left-10 z-50">
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
      <div className={classNames("absolute")}>
        <div className="absolute overflow-hidden">
          <div
            className={classNames("flex transition-all")}
            style={{
              transform: imagePosition,
            }}
          >
            {children}
          </div>
        </div>
      </div>
      <div
        className={classNames("absolute text-white top-[50vh] right-10 z-50 ", {
          "opacity-0 invisible":
            (img && img?.length === 1) || (img && img?.length - 1 === idx!),
        })}
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
