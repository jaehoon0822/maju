import React, { memo, useMemo, useState } from "react";
import { InputProps } from "./Input.types";
import { useFormContext } from "react-hook-form";
import module from "./Input.module.css";
import classNames from "classnames";

const Input = (
  props: Omit<InputProps, "name" | "id"> & { name: string; id: string }
) => {
  const { register, formState } = useFormContext();
  const { errors } = formState;
  const errorMessage = useMemo(
    () => errors?.fields?.message || errors?.[props.name]?.message || "",
    [errors]
  );
  const hasError = useMemo(() => !!errorMessage, [errorMessage]);

  return (
    <div className={module.styled_input_wrapper}>
      <label
        className="opacity-0 hidden absolute left-[9999px]"
        htmlFor={props.id}
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

export default memo(Input);
