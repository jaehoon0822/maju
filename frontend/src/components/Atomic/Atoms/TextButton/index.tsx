import React from "react";
import { TextButtonProps } from "./TextButton.type";
import module from "./TextButton.module.css";
import classNames from "classnames";
import Link from "next/link";

const TextButton = ({ href, label }: TextButtonProps) => {
  const textButtonStyle = classNames(module.text_button as string);
  return (
    <div>
      <Link className={textButtonStyle} href={href}>
        {label}
      </Link>
    </div>
  );
};

export default TextButton;
