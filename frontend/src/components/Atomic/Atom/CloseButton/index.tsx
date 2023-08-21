import React from "react";
import { CloseButtonProps } from "./CloseButton.type";
import module from "./CloseButton.module.css";
import classNames from "classnames";

const CloseButton = (props: CloseButtonProps) => {
  return (
    <div>
      <button
        role="button"
        {...props}
        className={classNames("group/close_btn", module.close_btn_wrapper)}
      >
        <div
          className={classNames(
            module.close_line_left,
            "group-hover/close_btn:rotate-[135deg]"
          )}
        />
        <div
          className={classNames(
            module.close_line_right,
            "group-hover/close_btn:-rotate-[135deg]"
          )}
        />
      </button>
    </div>
  );
};

export default CloseButton;
