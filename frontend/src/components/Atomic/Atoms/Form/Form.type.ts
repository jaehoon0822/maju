import { SetStateAction, useState } from "react";
import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  UseFormReturn,
  ValidationMode,
} from "react-hook-form";
import { ObjectSchema } from "yup";

export interface FormProps<T extends FieldValues> {
  children: React.ReactNode;
  onSubmit: SubmitHandler<T>;
  schema?: ObjectSchema<T>;
  defaultValues?: DefaultValues<T>;
  mode?: keyof ValidationMode;
  setUseFormReturnMethod?: React.Dispatch<
    SetStateAction<UseFormReturn<any> | undefined>
  >;
}
