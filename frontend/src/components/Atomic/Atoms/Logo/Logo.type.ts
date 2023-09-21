export type sizeType = "XL" | "L" | "M" | "SM";

export interface LogoProps {
  size?: sizeType;
  href?: string;
  onClick?: () => void;
}
