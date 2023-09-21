import classNames from "classnames";
import React, { ReactNode, memo } from "react";
import TopbarMenu from "../../Molecules/TopbarMenu";

const TopMenu = ({
  children,
  onClickSelectedIdx,
  selectedIdx = 0,
}: {
  children: ReactNode;
  selectedIdx?: number;
  onClickSelectedIdx: (idx: number) => void;
}) => {
  return (
    <div
      className={classNames(
        "w-auto border-[#d2d2d2] border-b-[1px] flex justify-center mt-8 sticky top-0 bg-white z-20"
      )}
    >
      <TopbarMenu
        selectedIdx={selectedIdx}
        onClickSelectedIdx={onClickSelectedIdx}
      >
        {children}
      </TopbarMenu>
    </div>
  );
};

export default memo(TopMenu);
