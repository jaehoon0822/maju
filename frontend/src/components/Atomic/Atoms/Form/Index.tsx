import React, { useState } from "react";
import { FormProps } from "./Form.type";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Form = <T extends FieldValues>({
  children,
  onSubmit,
  defaultValues,
  schema,
  setUseFormReturnMethod,
}: FormProps<T>) => {
  const method = useForm<T>({
    defaultValues: defaultValues || undefined,
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  if (setUseFormReturnMethod) {
    setTimeout(() => {
      setUseFormReturnMethod(method);
    });
  }

  return (
    <div>
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(onSubmit)}>{children}</form>
      </FormProvider>
    </div>
  );
};

export { Form };
