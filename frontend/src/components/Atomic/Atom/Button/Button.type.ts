import { ButtonHTMLAttributes } from "react";

export type VariantType = "primary" | "kakao";
export type ButtonSize = "medium" | "large";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant: VariantType;
  size: ButtonSize;
}
