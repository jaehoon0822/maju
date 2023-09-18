import React, { memo, useCallback } from "react";
import classNames from "classnames";
import Person from "@mui/icons-material/Person";
import Link from "next/link";
import module from "./SidMenu.module.css";
import { SideMenuProps } from "./SideMenu.type";
import Logo from "../../Atoms/Logo";
import TooltipListItem from "../../Atoms/TooltipListItem";
import useQueryGetUser from "@/hooks/queries/useQueryGetUser";
import { useDispatch } from "@/common/store";
import { setPos } from "@/common/store/slices/posSlice";
import useMutationLogout from "@/hooks/mutations/useMutationLogout";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { AxiosError } from "axios";

const SideMenu = ({ children }: SideMenuProps) => {
  const { data: userData } = useQueryGetUser();
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const logoutMutation = useMutationLogout();
  const onClick = useCallback(() => {
    dispatch(setPos(0));
  }, [setPos]);
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
      <div>
        <div className="mb-4 flex justify-center">
          <Logo size="SM" href="/home" />
        </div>
        {React.Children.map(children, (child) => {
          if (child) {
            return <div className="mb-4">{child}</div>;
          }
        })}
      </div>
      <div className={classNames(module.sidMenu_bottom)}>
        <TooltipListItem icon={<Person />} direction={"right"} title="닉네임">
          <Link href={`/profile/${userData?.nick}`} onClick={onClick}>
            <div
              className={classNames(
                "px-2 py-2 mb-2 border-solid border-b-[1px] border-transparent hover:border-[#d2d2d2] hover:bg-[#e9e9e9] hover:border-b-[1px]"
              )}
            >
              프로필 보기
            </div>
          </Link>
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
