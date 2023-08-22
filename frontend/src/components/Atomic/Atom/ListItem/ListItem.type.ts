import { SvgIconProps } from "@mui/material";

export interface ListItemProps {
  title: string;
  icon?: React.ReactElement<SvgIconProps>;
  href?: string;
  more?: boolean;
  active?: boolean;
}
