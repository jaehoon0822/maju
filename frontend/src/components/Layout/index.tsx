import classNames from "classnames";
import React, { ReactNode } from "react";
import MenuTemplate from "./Menu";
import TopMenu from "../Atomic/Organisms/TopMenu";
import { TopbarItem } from "../Atomic/Atoms/TopbarItem";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={classNames("flex m-auto border-r-[1px] border-solid")}>
      <MenuTemplate />
      <div
        className={classNames("flex flex-col w-full ml-[17.5rem] md:ml-[6rem]")}
      >
        <TopMenu>
          <TopbarItem title="나의 포스트" onClick={() => {}} />
          <TopbarItem title="팔로우 포스트" onClick={() => {}} />
        </TopMenu>
        <div
          className={classNames("px-20 h-full md:px-8 break-words break-all")}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
