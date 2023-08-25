import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import module from "./IconItem.module.css";
import { IconItemProps } from "./IconItem.type";

const IconItem = ({
  Icon,
  variants,
  more = false,
  diraction = "top",
  children,
  ...props
}: IconItemProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const tooltipRef = useRef<HTMLButtonElement>(null);

  const bgColorVariants = {
    red: "group-hover:bg-red-100 group-focus:bg-red-100",
    blue: "group-hover:bg-blue-100 group-focus:bg-blue-100",
    green: "group-hover:bg-green-100 group-focus:bg-green-100",
  };

  const fillColorVariants = {
    red: "group-hover:fill-red-500 group-focus:fill-red-500",
    blue: "group-hover:fill-blue-500 group-focus:fill-blue-500",
    green: "group-hover:fill-green-500 group-focus:fill-green-500",
  };

  const onClickToggle = () => {
    setIsActive((prev) => !prev);
  };

  const onClickOutArea = (event: Event) => {
    if (
      tooltipRef &&
      tooltipRef.current &&
      !tooltipRef.current.contains(event.target as Node)
    ) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", onClickOutArea);
    return () => {
      window.removeEventListener("click", onClickOutArea);
    };
  }, []);

  return (
    <button
      {...props}
      onClick={more ? onClickToggle : undefined}
      className={classNames(module.IconItem_wrapper, "group")}
      ref={tooltipRef}
      aria-label="icon-item"
    >
      <div
        data-testid="icon-wrapper"
        className={classNames(
          `transition-all ${bgColorVariants[variants]} group-hover:p-2 group-hover:rounded-full group-focus:p-2 group-focus:rounded-full`
        )}
      >
        <Icon className={classNames(`${fillColorVariants[variants]}`)} />
        {more && (
          <div
            data-testid="icon-toggle"
            className={classNames(module.IconItem_tooltip, module[diraction], {
              "opacity-0 invisible": !isActive,
              "opacity-100 visible": isActive,
              "z-10": isActive,
            })}
            onClick={onClickToggle}
          >
            {children}
          </div>
        )}
      </div>
    </button>
  );
};

export default IconItem;
