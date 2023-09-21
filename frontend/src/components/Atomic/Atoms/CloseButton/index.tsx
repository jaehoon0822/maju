import React, { memo } from "react";
import { CloseButtonProps } from "./CloseButton.type";
import module from "./CloseButton.module.css";
import classNames from "classnames";

// HTMLButtonAttributes 상속받은 props
const CloseButton = ({ color = "black", ...props }: CloseButtonProps) => {
  return (
    <div>
      <button
        role="button"
        aria-label="close-button"
        {...props}
        className={classNames(
          "group/close_btn",
          module.close_btn_wrapper,
          "z-50"
        )}
      >
        {/* 버튼 X 라인 */}
        <div
          className={classNames(
            module.close_line_left,
            "group-hover/close_btn:rotate-[135deg]",
            {
              "bg-white": color === "white",
              "bg-black": color === "black",
            }
          )}
        />
        <div
          className={classNames(
            module.close_line_right,
            "group-hover/close_btn:-rotate-[135deg]",
            {
              "bg-white": color === "white",
              "bg-black": color === "black",
            }
          )}
        />
      </button>
    </div>
  );
};

export default memo(CloseButton);
