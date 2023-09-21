import { User } from "@/common/types/index.types";
import { ChangeEvent } from "react";

export interface AvatarProps {
  disableLink?: boolean;
  user?: User;
  size?: "SM" | "M" | "L";
  isEdit?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
