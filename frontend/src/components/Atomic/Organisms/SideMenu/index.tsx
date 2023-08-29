import React from "react";
import classNames from "classnames";
import Person from "@mui/icons-material/Person";
import Link from "next/link";
import module from "./SidMenu.module.css";
import { SideMenuProps } from "./SideMenu.type";
import Logo from "../../Atoms/Logo";
import { TooltipListItem } from "../../Atoms/TooltipListItem";

const SideMenu = ({ children }: SideMenuProps) => {
  return (
    <div
      aria-label="side-menu"
      className={classNames(module.sideMenu_wrapper, "fixed")}
    >
      <div>
        <div className="mb-4 flex justify-center">
          <Logo size="SM" />
        </div>
        {React.Children.map(children, (child) => {
          if (child) {
            return <div className="mb-4">{child}</div>;
          }
        })}
      </div>
      <div className={classNames(module.sidMenu_bottom)}>
        <TooltipListItem icon={<Person />} direction="top" title="닉네임">
          <Link href="/profile">
            <div
              className={classNames(
                "px-2 py-2  mb-2 border-solid border-b-[1px] border-transparent hover:border-[#d2d2d2] hover:bg-[#e9e9e9] hover:border-b-[1px]"
              )}
            >
              프로필 보기
            </div>
          </Link>
          <Link href="/logout">
            <div
              className={classNames(
                "px-2 py-2 border-solid border-b-[1px] border-transparent hover:border-red-300 hover:bg-red-100 hover:border-b-[1px] "
              )}
            >
              로그아웃 하기
            </div>
          </Link>
        </TooltipListItem>
      </div>
    </div>
  );
};

export default SideMenu;
