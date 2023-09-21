import React, { memo } from "react";
import module from "./TooltipListItem.module.css";
import classNames from "classnames";
import { TooltipProps } from "./TooltipListItem.type";
import ListItem from "../ListItem";
import useTooltipListItem from "@/hooks/custom/useTooltipListItme";
import Backdrop from "../Backdrop";
import ModalTop from "../../Molecules/ModalTop";

const TooltipListItem = ({ children, direction, icon }: TooltipProps) => {
  const { isActive, isSM, onClickToggleActive, tooltipRef, data } =
    useTooltipListItem();
  return (
    <>
      <div
        className={classNames(module.tooltipListItem_wrapper, {
          "cursor-pointer": !isActive,
          "cursor-default": isActive,
        })}
        aria-label="tooltip-list-wrapper"
        ref={tooltipRef}
      >
        {/* menu 상에 보여줄 component */}
        <div
          onClick={isActive ? undefined : onClickToggleActive}
          aria-label="tooltip-list-title"
        >
          {data?.profile?.avatar ? (
            <ListItem title={data.nick} user={data} more />
          ) : (
            <ListItem title={data?.nick} icon={icon} more />
          )}
        </div>
        {/* item 클릭시 보여줄 component */}
        <div
          aria-label="tooltip-list"
          className={classNames(module.tooltipListItem_list, {
            [module[direction]]: !isSM,
            "opacity-100 visible sm:bottom-0 z-50": isActive,
            "opacity-0 invisible sm:-bottom-[100%] ": !isActive,
          })}
        >
          {isSM ? <ModalTop onClose={onClickToggleActive as any} /> : null}
          {children}
        </div>
      </div>
      {isSM ? (
        <Backdrop
          isActive={isActive}
          onClickClose={onClickToggleActive as any}
        />
      ) : null}
    </>
  );
};

export default memo(TooltipListItem);
