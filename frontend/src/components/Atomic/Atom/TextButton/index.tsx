import React from "react";
import module from "./TextButton.module.css";
import { TextButtonProps } from "./textButton.style";
import classNames from "classnames";
import Link from "next/link";

const TextButton = ({ href, lable }: TextButtonProps) => {
  return (
    <div>
      <Link className={classNames(module.text_button)} href={href}>
        {lable}
      </Link>
    </div>
  );
};

export default TextButton;
