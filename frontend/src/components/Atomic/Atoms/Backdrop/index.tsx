import { useSelector } from "@/common/store";
import classNames from "classnames";
import { useRouter } from "next/router";
import React from "react";

const Backdrop = ({ onClose }: { onClose?: () => void }) => {
  const { query } = useRouter();
  const { pos } = useSelector((state) => state.pos);

  return (
    <div
      aria-label="backdrop"
      onClick={onClose}
      className={classNames(
        "absolute left-0 w-full h-full bg-black/90 transition-all duration-100 overflow-hidden z-30",
        {
          "opacity-100 visible": query.modal,
          "opacity-0 invisible": !query.modal,
          "cursor-default": onClose == undefined,
          "cursor-pointer": onClose !== undefined,
        }
      )}
      style={{
        top: pos,
      }}
    ></div>
  );
};

export default Backdrop;
