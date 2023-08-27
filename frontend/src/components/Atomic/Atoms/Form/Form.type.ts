import { SetStateAction, useState } from "react";
import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { ObjectSchema } from "yup";

export interface FormProps<T extends FieldValues> {
  children: React.ReactNode;
  onSubmit: SubmitHandler<T>;
  schema: ObjectSchema<any>;
  defaultValues?: DefaultValues<T>;
  setUseFormReturnMethod?: React.Dispatch<
    SetStateAction<UseFormReturn<T> | undefined>
  >;
}
