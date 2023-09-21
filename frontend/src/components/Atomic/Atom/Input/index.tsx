import React from "react";
import { InputProps } from "./Input.types";
import { useFormContext } from "react-hook-form";
import module from "./input.module.css";
import classNames from "classnames";

const Input = (props: Omit<InputProps, "name"> & { name: string }) => {
  const { register, formState } = useFormContext();
  const { errors } = formState;

  const errorMessage = errors?.[props.name]?.message || "";
  const hasError = !!errorMessage;

  return (
    <div className={module.styled_input_wrapper}>
      <label
        className="opacity-0 overflow-hidden absolute left-[9999px]"
        htmlFor={props.name}
      >
        {props.label}
      </label>
      <input
        className={`${module.styled_input}`}
        type={props.type !== "text" ? props.type : "text"}
        {...props}
        {...register(props.name)}
      />
      <div>
        <span
          key={errorMessage as string}
          className={classNames(module["styled_input-error"], {
            [module.active]: hasError,
          })}
        >
          {errorMessage as string}
        </span>
      </div>
    </div>
  );
};

export { Input };
