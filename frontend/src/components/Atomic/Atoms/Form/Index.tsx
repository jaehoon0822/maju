import React, { useEffect } from "react";
import { FormProps } from "./Form.type";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Form = <T extends FieldValues>({
  children,
  onSubmit,
  defaultValues,
  schema,
  setUseFormReturnMethod,
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
  }, [setUseFormReturnMethod, method]);

  return (
    <div>
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(onSubmit)}>{children}</form>
      </FormProvider>
    </div>
  );
};

export { Form };
