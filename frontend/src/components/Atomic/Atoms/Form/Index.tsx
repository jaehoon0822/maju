import React, { memo, useEffect } from "react";
import { FormProps } from "./Form.type";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";

const Form = <T extends FieldValues>({
  children,
  onSubmit,
  defaultValues,
  schema,
  setUseFormReturnMethod,
  setErrors,
  mode = "onBlur",
}: FormProps<T>) => {
  const method = useForm<T>({
    defaultValues: defaultValues || undefined,
    resolver: schema ? yupResolver(schema) : undefined,
    mode,
  });

  useEffect(() => {
    if (setUseFormReturnMethod) {
      setUseFormReturnMethod(method);
    }
    if (setErrors) {
      setErrors(method.formState.errors);
    }
  }, [method, setUseFormReturnMethod, method.formState.errors]);

  return (
    <div className={classNames("w-full")}>
      <FormProvider {...method}>
        <form
          onSubmit={method.handleSubmit(onSubmit)}
          className={classNames("flex justify-center flex-col w-full")}
        >
          {children}
        </form>
      </FormProvider>
    </div>
  );
};

export default memo(Form);
