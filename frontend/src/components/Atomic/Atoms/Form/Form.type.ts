import { Dispatch, SetStateAction } from "react";
import {
  DefaultValues,
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormReturn,
  ValidationMode,
} from "react-hook-form";
import { ObjectSchema } from "yup";

export interface FormProps<T extends FieldValues> {
  children: React.ReactNode;
  onSubmit: SubmitHandler<any>;
  schema?: ObjectSchema<T>;
  defaultValues?: DefaultValues<T>;
  mode?: keyof ValidationMode;
  setErrors?: Dispatch<SetStateAction<FieldErrors | undefined>>;
  setUseFormReturnMethod?: React.Dispatch<
    SetStateAction<UseFormReturn<any> | undefined>
  >;
}
