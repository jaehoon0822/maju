import React, { memo, useCallback } from "react";
import classNames from "classnames";
import Person from "@mui/icons-material/Person";
import Link from "next/link";
import module from "./SidMenu.module.css";
import { SideMenuProps } from "./SideMenu.type";
import Logo from "../../Atoms/Logo";
import TooltipListItem from "../../Atoms/TooltipListItem";
import useQueryGetUser from "@/hooks/queries/useQueryGetUser";
import useMutationLogout from "@/hooks/mutations/useMutationLogout";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { AxiosError } from "axios";

const SideMenu = ({ children }: SideMenuProps) => {
  const { push } = useRouter();
  const { data: userData } = useQueryGetUser();
  const queryClient = useQueryClient();
  const logoutMutation = useMutationLogout();
  const onClickLogout = useCallback(() => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.removeQueries(["/user"]);
        push("/");
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          throw error;
        }
      },
    });
  }, [queryClient, logoutMutation]);

  return (
    <div
      aria-label="side-menu"
      className={classNames(module.sideMenu_wrapper, "fixed")}
    >
      <div className={classNames("sm:flex sm:w-3/4")}>
        <div className="mb-4 flex justify-center sm:hidden">
          <Logo size="SM" href="/home" />
        </div>
        {React.Children.map(children, (child) => {
          if (child) {
            return <div className="mb-4 sm:mb-0 sm:w-1/3">{child}</div>;
          }
        })}
      </div>
      <div className={classNames(module.sidMenu_bottom)}>
        <TooltipListItem icon={<Person />} direction={"right"} title="닉네임">
          {userData ? (
            <Link href={`/profile/${userData.nick}`}>
              <div
                className={classNames(
                  "px-2 py-2 mb-2 border-solid border-b-[1px] border-transparent hover:border-[#d2d2d2] hover:bg-[#e9e9e9] hover:border-b-[1px]"
                )}
              >
                프로필 보기
              </div>
            </Link>
          ) : null}
          <div onClick={onClickLogout}>
            <div
              className={classNames(
                "px-2 py-2 border-solid border-b-[1px] border-transparent hover:border-red-300 hover:bg-red-100 hover:border-b-[1px] "
              )}
            >
              로그아웃 하기
            </div>
          </div>
        </TooltipListItem>
      </div>
    </div>
  );
};

export default memo(SideMenu);
