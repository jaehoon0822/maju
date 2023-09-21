import { useEffect, useRef, useState } from "react";

const useImg = () => {
  const [imageHeight, setImageHeight] = useState<number>(0);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.onload = () => {
        if (imgRef.current && imgRef.current.naturalHeight) {
          setImageHeight(imgRef.current.naturalHeight);
        }
      };
    }
  }, [imgRef.current, imageHeight]);

  return {
    imageHeight,
    imgRef,
  };
};

export default useImg;
