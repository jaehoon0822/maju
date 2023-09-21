import { User } from "@/common/types/index.types";
import { SvgIconProps } from "@mui/material";

export interface ListItemProps {
  user?: User;
  title?: string;
  icon?: React.ReactElement<SvgIconProps>;
  href?: string;
  more?: boolean;
  active?: boolean;
  onClick?: () => void;
}
