import React, { memo } from "react";
import module from "./TopbarItem.module.css";
import { TopbarItemProps } from "./TopbarItme.type";
import classNames from "classnames";

const TopbarItem = ({ title, onClick }: TopbarItemProps) => {
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

export default memo(TopbarItem);
