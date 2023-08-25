import React from "react";
import { FormProps } from "./Form.type";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ObjectSchema } from "yup";

const Form = <T extends FieldValues, S extends ObjectSchema<T>>({
  children,
  onSubmit,
  defaultValues,
  schema,
}: FormProps<T>) => {
  const method = useForm<T>({
    defaultValues: defaultValues || undefined,
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export { Form };
