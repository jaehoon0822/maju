import React from "react";
import { LogoProps } from "./Logo.type";
import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";

const Logo = ({ size = "M", onClick }: LogoProps) => {
  const sizeObj = {
    SM: "w-[3.875rem] h-[1.375rem]",
    M: "w-[5.25rem] h-[1.875rem]",
    L: "w-[7.75rem] h-[2.75rem]",
    XL: "w-[12.875rem] h-[4.625rem]",
  };

  return (
    <div
      onClick={onClick}
      className={classNames({
        "cursor-pointer": onClick,
      })}
    >
      <div aria-label="logo" className={classNames(sizeObj[size], "relative")}>
        <Image
          src={`/logo/Logo.svg`}
          alt="logo"
          fill
          sizes="lg:100vw md:80vw sm:40vw"
          priority
          className={classNames("object-contain")}
        />
      </div>
    </div>
  );
};

export default Logo;
