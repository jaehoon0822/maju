import { SvgIconProps } from "@mui/material";

type directionType = "left" | "right" | "top" | "bottom";
export interface TooltipProps {
  children: React.ReactNode;
  direction: directionType;
  title: string;
  icon: React.ReactElement<SvgIconProps>;
}
