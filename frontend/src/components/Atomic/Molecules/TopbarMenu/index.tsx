import React, {
  ReactElement,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import module from "./TopbarManu.module.css";

const TopbarMenu = ({
  children,
  onClickSelectedIdx,
  selectedIdx,
  margin = 40,
}: TopbarMenuProps) => {
  const [parentWidth, setParentWidth] = useState<number>(0);
  const parentRef = useRef<HTMLDivElement>(null);
  const marginStyle = `mr-[${margin}px] sm:mr-10`;

  useEffect(() => {
    if (parentRef.current) {
      setParentWidth(parentRef.current.offsetWidth);
    }
  });

  const onClickSetIdx = useCallback(
    (ChildClick: () => Promise<void> | void, index: number) => () => {
      onClickSelectedIdx(index);
      ChildClick();
    },
    []
  );
  const childArr = useMemo(() => React.Children.toArray(children), [children]);
  const elemWidth = useMemo(
    () =>
      `calc((${parentWidth}px - (${margin}px * ${childArr.length - 1})) / ${
        childArr.length
      })`,
    [parentWidth, margin, childArr]
  );
  const topbarX = useMemo(
    () => `calc((${elemWidth} + ${margin}px) * ${selectedIdx})`,
    [elemWidth, margin, selectedIdx]
  );

  return (
    <div
      aria-label="topbar-menu"
      className={classNames(module.topbarMenu_wrapper)}
    >
      <div className={classNames(module.topbarMenu_list)} ref={parentRef}>
        <div className="flex">
          {childArr.map((child, idx) => {
            if (child) {
              const childElem = React.cloneElement(child as ReactElement, {
                onClick: onClickSetIdx(
                  (child as ReactElement).props.onClick,
                  idx
                ),
              });
              return (
                <div
                  key={idx}
                  className={classNames(module.topbarMenu_item, marginStyle)}
                >
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
    </div>
  );
};

export default memo(TopbarMenu);
