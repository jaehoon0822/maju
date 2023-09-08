import { useSelector } from "@/common/store";
import { Img } from "@/common/types/index.types";
import { useState } from "react";

const useImageSlider = (img: Img[]) => {
  const { pos } = useSelector((state) => state.pos);
  const [idx, setIdx] = useState<number | null>(null);
  // 어떤이유인지 모르겠지만 밑의 로직에서
  // 맨 아래 3번째가 제대로 적용이 안됨
  // 콘솔 및 element 에 적용된것 확인됨
  // 2 번까지는 translate 가 제대로 적용되지만,
  // 3 번만 적용안되고 첫번째 이미지로 넘어감
  // 이유를 찾지 못함

  // const imagePosition: {
  //   [key: number]: string;
  // } = {
  //   0: "-translate-x-[0]",
  //   1: "-translate-x-[100vw]",
  //   2: "-translate-x-[200vw]",
  //   3: "-translate-x-[300vw]",
  // };

  const onClickNext = () => {
    if (idx == null) {
      return setIdx(1);
    }
    if (img) {
      return setIdx((prev) =>
        prev! < img.length - 1 ? prev! + 1 : img.length - 1
      );
    }
  };

  const onClickPrev = () => {
    if (idx == null) {
      return setIdx(0);
    }
    setIdx((prev) => (prev! <= 0 ? 0 : prev! - 1));
  };

  // 이렇게 대체하고 style 을 입힘
  const imagePosition: {
    [key: number]: string;
  } = {
    0: "translateX(0)",
    1: "translateX(-100vw)",
    2: "translateX(-200vw)",
    3: "translateX(-300vw)",
  };

  return {
    imagePosition: imagePosition[idx!],
    onClickNext,
    onClickPrev,
    setIdx,
    idx,
    pos,
  };
};

export default useImageSlider;
