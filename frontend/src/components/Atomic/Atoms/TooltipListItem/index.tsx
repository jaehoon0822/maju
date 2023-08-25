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
  // tooltip 을 활성화 시키는 state
  const [isActive, setIsActive] = useState<boolean>(false);
  // tooltip 을 참조하는 ref
  const tooltipRef = useRef<HTMLDivElement>(null);

  // tooltip 이외의 영역 클릭시 일어나는 이벤트 함수
  const onClickOutsideClick = (event: MouseEvent) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(event.target as Node)
    ) {
      setIsActive(false);
    }
  };

  // tooltip 클릭시 isActive 를 토글
  const onClickToggleActive = () => {
    setIsActive((prev) => !prev);
  };

  // document 객체에 onClikcOutsideClick 이벤트 등록
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
