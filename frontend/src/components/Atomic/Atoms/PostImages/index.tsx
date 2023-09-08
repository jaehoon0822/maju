import { Post } from "@/common/types/index.types";
import PhotoSizeSelectIcon from "@mui/icons-material/PhotoSizeSelectActual";
import classNames from "classnames";
import Image from "next/image";
import React, { MouseEvent, useMemo } from "react";
import Img from "../Img";

interface PostImageProps {
  post: Post;
  onClickModal: (psotId: string) => void;
}

const PostImages = ({ post, onClickModal }: PostImageProps) => {
  const onClickPosImages = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClickModal(post.id);
  };
  if (post?.img?.length === 0) {
    return null;
  }

  return (
    <>
      {post.img && post.img.length !== 0 && post.img!.length === 1 ? (
        <Img img={post.img[0].img} onClick={onClickPosImages} />
      ) : (
        <div
          className={classNames(
            "group relative flex flex-wrap object-contain 1/2 mb-10 cursor-pointer"
          )}
          onClick={onClickPosImages}
        >
          {useMemo(
            () =>
              post.img &&
              post.img.length !== 0 &&
              post.img.map((image) => {
                return (
                  <div
                    key={image.id}
                    className={classNames("relative w-1/2 h-[182px]  ")}
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}/${image.img}`}
                      alt={"test"}
                      fill
                      className="object-cover object-cneter pr-2 pt-2 rounded-xl"
                    />
                  </div>
                );
              }),
            [post.img]
          )}
          <div
            className={classNames(
              "absolute z-10 transition-opacity",
              "w-full h-full",
              "bg-black bg-opacity-50",
              "group-hover:opacity-100 group-focus:opacity-100 opacity-0",
              "translate-y-2",
              {
                "rounded-xl": post.img && post.img.length > 1,
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
        </div>
      )}
    </>
  );
};

export default PostImages;
