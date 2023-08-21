import { ButtonHTMLAttributes } from "react";

export type VariantType = "primary" | "kakao";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant: VariantType;
}
