import React, { useEffect, useRef, useState } from "react";
import module from "./TooltipListItem.module.css";
import classNames from "classnames";
import { TooltipProps } from "./TooltipListItem.type";
import { ListItem } from "../ListItem";

const TooltipListItem = ({
  children,
  direction,
  title,
  icon,
}: TooltipProps) => {
  const [active, setActive] = useState<boolean>(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const onClickOutsideClick = (event: MouseEvent) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(event.target as Node)
    ) {
      setActive(false);
    }
  };

  const onClickToggleActive = () => {
    setActive((prev) => !prev);
  };

  useEffect(() => {
    document.addEventListener("click", onClickOutsideClick);
    return () => {
      document.addEventListener("click", onClickOutsideClick);
    };
  }, []);

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
        <ListItem title={title} icon={icon} more />
      </div>
      {/* item 클릭시 보여줄 component */}
      <div
        aria-label="tooltip-list"
        className={classNames(module.tooltipListItem_list, module[direction], {
          "opacity-100 visible": active,
          "opacity-0 invisible": !active,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export { TooltipListItem };
