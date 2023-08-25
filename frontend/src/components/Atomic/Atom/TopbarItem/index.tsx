import React from "react";
import module from "./TopbarItem.module.css";
import { TobparItemProps } from "./TopbarItme.type";
import classNames from "classnames";

const TopbarItem = ({ title, onClick }: TobparItemProps) => {
  return (
    <div
      role="button"
      className={classNames(module.topbarItem_wrapper)}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export { TopbarItem };
