import React, { ReactElement, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import module from "./TopbarManu.module.css";

const TopbarMenu = ({ children, margin = 16 }: TopbarMenuProps) => {
  const [idx, setIdx] = useState<number>(0);
  const [parentWidth, setParentWidth] = useState<number>(0);
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parentRef.current) {
      setParentWidth(parentRef.current.offsetWidth);
    }
  });

  const onClickSetIdx =
    (ChildClick: () => Promise<void> | void, index: number) => () => {
      setIdx((prev) => index);
      ChildClick();
    };
  const childArr = React.Children.toArray(children);
  const elemWidth = `calc((${parentWidth}px - (${margin}px * ${
    childArr.length - 1
  })) / ${childArr.length})`;
  const topbarX = `calc((${elemWidth} + ${margin}px) * ${idx})`;

  return (
    <div className={classNames(module.topbarMenu_wrapper)} ref={parentRef}>
      <div className={classNames(module.topbarMenu_list)}>
        {childArr.map((child, idx) => {
          if (child) {
            const childElem = React.cloneElement(child as ReactElement, {
              onClick: onClickSetIdx(
                (child as ReactElement).props.onClick,
                idx
              ),
            });
            return (
              <div key={idx} className={classNames(module.topbarMenu_item)}>
                {childElem}
              </div>
            );
          }
        })}
      </div>
      <div
        className={classNames(module.topbarMenu_bar)}
        style={{
          width: elemWidth,
          transform: `translateX(${topbarX})`,
        }}
      ></div>
    </div>
  );
};

export { TopbarMenu };
