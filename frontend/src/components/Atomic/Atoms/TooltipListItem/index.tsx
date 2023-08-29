import React, { useEffect, useRef, useState } from "react";
import module from "./TooltipListItem.module.css";
import classNames from "classnames";
import { TooltipProps } from "./TooltipListItem.type";
import { ListItem } from "../ListItem";
import useTooltipListItem from "@/hooks/custom/useTooltipListItme";

const TooltipListItem = ({
  children,
  direction,
  title,
  icon,
}: TooltipProps) => {
  const { isActive, onClickToggleActive, tooltipRef, data } =
    useTooltipListItem();
  return (
    <div
      className={classNames(module.tooltipListItem_wrapper)}
      aria-label="tooltip-list-wrapper"
    >
      {/* menu 상에 보여줄 component */}
      <div
        ref={tooltipRef}
        onClick={onClickToggleActive}
        aria-label="tooltip-list-title"
      >
        {data.user.img ? (
          <ListItem title={data.user.nick} img="/user1.jpg" more />
        ) : (
          <ListItem title={data.user.nick} icon={icon} more />
        )}
      </div>
      {/* item 클릭시 보여줄 component */}
      <div
        aria-label="tooltip-list"
        className={classNames(module.tooltipListItem_list, module[direction], {
          "opacity-100 visible": isActive,
          "opacity-0 invisible": !isActive,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export { TooltipListItem };
