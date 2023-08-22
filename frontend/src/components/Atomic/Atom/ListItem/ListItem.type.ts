import { SvgIconProps } from "@mui/material";

export interface ListItemProps {
  title: string;
  img?: React.ReactElement<SvgIconProps>;
  href: string;
  more?: boolean;
  active?: boolean;
}
