import { UseFormReturn } from "react-hook-form";
import { User } from "@/common/types/index.types";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface AvatarProps {
  disableLink?: boolean;
  user?: User;
  size?: "SM" | "M" | "L";
  isEdit?: boolean;
  useFormReturn?: UseFormReturn;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
}
