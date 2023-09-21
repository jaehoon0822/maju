import { useDispatch } from "@/common/store";
import { setCommentModalPos } from "@/common/store/slices/commentModalPosSlice";
import useGetPathname from "@/hooks/custom/useGetPathname";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { MouseEvent, useCallback } from "react";

const Backdrop = ({
  isActive,
  onClickClose,
}: {
  isActive?: boolean;
  onClickClose?: (e?: MouseEvent<HTMLElement>) => void;
}) => {
  const { query, back } = useRouter();
  const dispatch = useDispatch();
  const onClose = useCallback(() => {
    back();
    if (query.modal === "comments") dispatch(setCommentModalPos(0));
  }, [query.modal]);

  const isVisible = isActive !== undefined ? isActive : query.modal;

  return (
    <div
      aria-label="backdrop"
      onClick={onClickClose ? onClickClose : onClose}
      className={classNames(
        "fixed left-0 top-0 w-full h-full bg-black/80 transition-all duration-100 overflow-hidden z-30",
        {
          "opacity-100 visible": isVisible,
          "opacity-0 invisible": !isVisible,
          "cursor-default": onClose == undefined,
          "cursor-pointer": onClose !== undefined,
        }
      )}
    ></div>
  );
};

export default Backdrop;
