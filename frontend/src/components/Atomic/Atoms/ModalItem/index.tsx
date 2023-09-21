import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import classNames from "classnames";
import React from "react";

const ModalItem = ({
  Icon,
  title,
  variants,
  onClick,
}: {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  title: string;
  variants: "blue" | "rose";
  onClick: () => void;
}) => {
  const variantsBgColor = {
    blue: "hover:bg-blue-500/10 focus:bg-blue-500/10 hover:border-blue-500/40 ",
    rose: "hover:bg-rose-500/10 focus:bg-rose-500/10 hover:border-rose-500/40 ",
  };
  const variantsIconColor = {
    blue: "text-blue-500 group-hover:text-blue-600 group-focus:text-blue-600",
    rose: "text-rose-500 group-hover:text-rose-600 group-focus:text-rose-600",
  };
  const variantsTextColor = {
    blue: "text-blue-500 group-hover:text-blue-600 group-active:text-blue-600",
    rose: "text-rose-500 group-hover:text-rose-600 group-active:text-rose-600",
  };

  return (
    <button
      onClick={onClick}
      className={classNames(
        "group flex px-4 py-4 border-b-[1px] border-transparent transition-all hover:border-solid hover:border-b-[1px] cursor-pointer",
        variantsBgColor[variants]
      )}
    >
      <Icon
        className={classNames(
          "group-hover:transition-colors group-focus:transition-colors",
          variantsIconColor[variants]
        )}
      />
      <span className={classNames("ml-4", variantsTextColor[variants])}>
        {title}
      </span>
    </button>
  );
};

export default ModalItem;
