import { Dispatch, ReactNode, SetStateAction } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { ObjectSchema } from "yup";

export interface ModalFromProps {
  children: ReactNode;
  schema: ObjectSchema<any>;
  onSubmit: SubmitHandler<any>;
  buttonLabel: string;
  defaultValues?: Record<string, any>;
  setUseFormReturnMethod?: Dispatch<
    SetStateAction<UseFormReturn<any> | undefined>
  >;
}
