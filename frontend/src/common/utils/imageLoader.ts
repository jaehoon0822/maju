import path from "path";
import { ImageLoader } from "next/image";

export const imageLoader: ImageLoader = ({ src, width }) => {
  const originSrc = src.split("/");
  const srcType = originSrc[0];
  const srcImg = path.parse(originSrc[1]).name;
  const selectedWidth =
    width > 960 ? `raw` : width > 576 ? `w960` : width > 348 ? `w576` : `w348`;

  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${srcType}/${selectedWidth}/${srcImg}.webp`;
};
