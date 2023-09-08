import { HTMLAttributes, MouseEvent } from "react";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type colorType = "red" | "rose" | "blue";
export type directionType = "left" | "right" | "bottom" | "top";

export interface IconItemProps extends HTMLAttributes<HTMLDivElement> {
  // icon: React.ReactElement<SvgIconProps>;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  variants: colorType;
  direction?: directionType;
  more?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
}
