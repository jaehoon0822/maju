import { ButtonHTMLAttributes } from "react";

export type VariantType = "primary" | "kakao" | "follow" | "warn";
export type ButtonSize = "medium" | "large";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant: VariantType;
  size: ButtonSize;
}
