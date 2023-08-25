import { HTMLAttributes } from "react";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type colorType = "red" | "green" | "blue";
export type diractionType = "left" | "right" | "bottom" | "top";

export interface IconItemProps extends HTMLAttributes<HTMLButtonElement> {
  // icon: React.ReactElement<SvgIconProps>;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  variants: colorType;
  diraction?: diractionType;
  more?: boolean;
  children?: React.ReactNode;
}
