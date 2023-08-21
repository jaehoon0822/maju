import React from "react";
import module from "./button.module.css";
import { ButtonProps } from "./button.type";
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
