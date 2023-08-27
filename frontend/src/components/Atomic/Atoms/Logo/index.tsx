import React from "react";
import { LogoProps } from "./Logo.type";
import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";

const Logo = ({ size = "M", href = "/" }: LogoProps) => {
  const sizeObj = {
    SM: "w-[3.875rem] h-[1.375rem]",
    M: "w-[5.25rem] h-[1.875rem]",
    L: "w-[7.75rem] h-[2.75rem]",
    XL: "w-[12.875rem] h-[4.625rem]",
  };

  return (
    <div aria-label="logo" className={classNames(sizeObj[size], "relative")}>
      <Link href={href}>
        <Image
          src={`/logo/Logo.svg`}
          alt="logo"
          fill
          className={classNames("object-contain")}
        />
      </Link>
    </div>
  );
};

export default Logo;
