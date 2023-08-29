import classNames from "classnames";
import React, { ReactNode } from "react";
import { TopbarMenu } from "../../Molecules/TopbarMenu";
import { TopbarItem } from "../../Atoms/TopbarItem";

const TopMenu = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={classNames(
        "w-auto border-[#d2d2d2] border-b-[1px] flex justify-center pt-8"
      )}
    >
      <TopbarMenu>{children}</TopbarMenu>
    </div>
  );
};

export default TopMenu;
