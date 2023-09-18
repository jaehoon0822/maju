import { useDispatch } from "@/common/store";
import { setCommentModalPos } from "@/common/store/slices/commentModalPosSlice";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { memo, useCallback } from "react";

const Backdrop = () => {
  const { query, back } = useRouter();
  const dispatch = useDispatch();
  const onClose = useCallback(() => {
    back();
    if (query.modal === "comments") dispatch(setCommentModalPos(0));
  }, [query.modal]);

  return (
    <div
      aria-label="backdrop"
      onClick={onClose}
      className={classNames(
        "fixed left-0 top-0 w-full h-full bg-black/80 transition-all duration-100 overflow-hidden z-30",
        {
          "opacity-100 visible": query.modal,
          "opacity-0 invisible": !query.modal,
          "cursor-default": onClose == undefined,
          "cursor-pointer": onClose !== undefined,
        }
      )}
    ></div>
  );
};

export default memo(Backdrop);
