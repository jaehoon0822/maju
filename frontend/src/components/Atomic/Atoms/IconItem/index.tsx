import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import module from "./IconItem.module.css";
import { IconItemProps } from "./IconItem.type";

const IconItem = ({
  Icon,
  variants,
  more = false,
  direction = "top",
  onClick,
  children,
  disabled = false,
  ...props
}: IconItemProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const bgColorVariants = useMemo(
    () => ({
      red: "group-hover:bg-red-400 group-focus:bg-red-400",
      blue: "group-hover:bg-blue-100 group-focus:bg-blue-100",
      rose: "group-hover:bg-rose-100 group-focus:bg-rose-100",
    }),
    []
  );

  const fillColorVariants = useMemo(
    () => ({
      red: "text-red-500 group-hover:fill-red-100 group-focus:fill-red-100",
      blue: "text-blue-500 group-hover:fill-blue-500 group-focus:fill-blue-500",
      rose: "text-rose-400 group-hover:fill-rose-400 group-focus:fill-rose-400",
    }),
    []
  );

  const DisabledColorVariants = useMemo(
    () => ({
      red: "text-red-300 group-hover:fill-red-100 group-focus:fill-red-100",
      blue: "text-blue-100 group-hover:fill-blue-100 group-focus:fill-blue-100",
      rose: "text-rose-200 group-hover:fill-rose-100 group-focus:fill-rose-100",
    }),
    []
  );

  const onClickToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, [isActive]);

  const onClickOutArea = useCallback(
    (event: Event) => {
      if (
        tooltipRef &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    },
    [tooltipRef.current]
  );

  useEffect(() => {
    window.addEventListener("click", onClickOutArea);
    return () => {
      window.removeEventListener("click", onClickOutArea);
    };
  }, []);

  return (
    <div
      onClick={more ? onClickToggle : onClick}
      className={classNames(module.IconItem_wrapper, "group h-10", {
        "cursor-not-allowed": disabled,
        "cursor-pointer": !disabled,
      })}
      ref={tooltipRef}
      {...props}
    >
      <div
        data-testid="icon-wrapper"
        className={classNames(
          `transition-all group-hover:p-2 group-hover:rounded-full group-focus:p-2 group-focus:rounded-full`,
          {
            [bgColorVariants[variants]]: !disabled,
          }
        )}
      >
        <Icon
          className={classNames({
            [fillColorVariants[variants]]: !disabled,
            [DisabledColorVariants[variants]]: disabled,
          })}
        />
        {more && (
          <div
            data-testid="icon-toggle"
            className={classNames(module.IconItem_tooltip, module[direction], {
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
    </div>
  );
};

export default memo(IconItem);
