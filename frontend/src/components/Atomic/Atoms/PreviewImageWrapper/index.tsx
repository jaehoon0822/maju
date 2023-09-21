import React, { MutableRefObject, ReactNode, memo } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import CloseButton from "../CloseButton";

const ImagePreviewWrapper = ({
  imageModalRef,
  onClose,
  children,
  modalName,
}: {
  imageModalRef: MutableRefObject<HTMLDivElement | null>;
  onClose: () => void;
  children: ReactNode;
  modalName: string;
}) => {
  const { query } = useRouter();
  return (
    <div
      ref={imageModalRef}
      className={classNames(
        "fixed w-screen h-screen left-[50vw] top-[50vh] -translate-x-1/2 -translate-y-1/2 z-50",
        {
          "opacity-0 invisible": query.modal !== `image/${modalName}`,
          "opacity-100 visible": query.modal === `image/${modalName}`,
        }
      )}
    >
      {/* slider 를 자식으로 넣는 부분 */}
      {children}
      <div className={classNames("absolute top-14 left-14")}>
        <CloseButton color="white" onClick={onClose} />
      </div>
    </div>
  );
};

export default memo(ImagePreviewWrapper);
