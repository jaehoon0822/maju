import { OnLoadingComplete } from "next/dist/shared/lib/get-img-props";
import { useEffect, useRef, useState } from "react";

const useImg = ({ img }: { img: string }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [deviceWidth, setDiviceWidth] = useState<number>(0);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onLoadignComplateHandler: OnLoadingComplete = (img) => {
    setIsLoading(false);
  };

  const onErrorHanlder = () => {
    setIsLoading(true);
    if (retryCount < 3) {
      setTimeout(() => {
        setRetryCount((prev) => prev + 1);
      }, 1500);
    } else {
      setIsLoading(false);
    }
  };

  const imageWidth = deviceWidth >= 1200 ? 576 : 348;
  const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}/post/w${imageWidth}/${img}`;
  const imageBlur =
    "data:image/;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAcAAA0ACbYD1v4AAAAASUVORK5CYII=";

  useEffect(() => {
    setDiviceWidth(window.innerWidth);
  }, [window]);

  return {
    imgRef,
    onErrorHanlder,
    onLoadignComplateHandler,
    isLoading,
    imageUrl,
    imageBlur,
    retryCount,
    deviceWidth,
  };
};

export default useImg;
