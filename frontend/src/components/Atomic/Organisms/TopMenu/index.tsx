import classNames from "classnames";
import React, { ReactNode } from "react";
import { TopbarMenu } from "../../Molecules/TopbarMenu";

const TopMenu = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={classNames(
        "w-auto border-[#d2d2d2] border-b-[1px] flex justify-center mt-8 sticky top-0 bg-white z-20"
      )}
    >
      <TopbarMenu>{children}</TopbarMenu>
    </div>
  );
};

export default TopMenu;
