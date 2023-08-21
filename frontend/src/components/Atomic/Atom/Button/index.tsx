import React from "react";
import module from "./Button.module.css";
import { ButtonProps } from "./Button.type";
import classNames from "classnames";

const Button = ({ label, variant, ...buttonAttrs }: ButtonProps) => {
  const buttonClassName = classNames(module.btn, module[`btn-${variant}`]);
  return (
    <button className={buttonClassName} {...buttonAttrs}>
      {label}
    </button>
  );
};

export { Button };
