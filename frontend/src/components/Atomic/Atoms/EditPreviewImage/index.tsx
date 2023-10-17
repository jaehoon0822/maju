import Image from "next/image";
import classNames from "classnames";
import CloseIcon from "@mui/icons-material/Close";
import { memo, useEffect, useState } from "react";
import Spinner from "../Spinner";

const EditPerviewImage = ({
  images,
  onRemoveImage,
}: {
  images: string[];
  onRemoveImage: (idx: number) => void;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const imageBlur =
    "data:image/;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAcAAA0ACbYD1v4AAAAASUVORK5CYII=";

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  return (
    <div className={classNames("flex flex-wrap")}>
      {images.map((image, idx) => (
        <div
          className={classNames(
            "group relative h-40 w-1/4 md:w-1/2 cursor-pointer"
          )}
          key={idx}
        >
          <Image
            src={
              image.startsWith("data:image")
                ? image
                : `${process.env.NEXT_PUBLIC_IMAGE_URL}/post/raw/${image}`
            }
            placeholder="blur"
            blurDataURL={imageBlur}
            alt={image}
            onError={() => {
              setIsLoading(true);
            }}
            onLoadingComplete={() => {
              setIsLoading(false);
            }}
            sizes="lg:100vw md:80vw sm:40vw"
            className="object-cover pr-2 pt-2 rounded-xl last:pr-0"
            fill
          />
          {isLoading ? (
            <div
              className={classNames(
                "w-full h-full flex justify-center items-center",
                {
                  "blur-sm bg-gray-100 scale-105 opacity-100": isLoading,
                  "opacity-0": !isLoading,
                }
              )}
            >
              <Spinner isLoading={isLoading} />
            </div>
          ) : (
            <div
              className={classNames(
                "bg-black transition-opacity bg-opacity-50 h-full absolute opacity-0 group-hover:opacity-100 rounded-xl"
              )}
              style={{
                width: "calc(100% - 8px)",
                height: "calc(100% - 8px)",
                top: "8px",
              }}
              onClick={() => onRemoveImage(idx)}
            >
              <span
                className={classNames(
                  "font-bold text-white block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                )}
              >
                <CloseIcon />
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default memo(EditPerviewImage);
