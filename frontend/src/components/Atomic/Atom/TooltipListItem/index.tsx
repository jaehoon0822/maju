import React, { useEffect, useRef, useState } from "react";
import module from "./Tooltip.module.css";
import classNames from "classnames";
import { TooltipProps } from "./Tooltip.type";
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
    <div className={classNames(module.tooltipListItem_wrapper)}>
      {/* menu 상에 보여줄 component */}
      <div
        ref={tooltipRef}
        className={classNames()}
        onClick={onClickToggleActive}
      >
        <ListItem title={title} icon={icon} more />
      </div>
      {/* item 클릭시 보여줄 component */}
      <div
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
