import { DefaultValues, FieldValues, SubmitHandler } from "react-hook-form";
import { ObjectSchema } from "yup";

export interface FormProps<T extends FieldValues> {
  children: React.ReactNode;
  onSubmit: SubmitHandler<T>;
  schema: ObjectSchema<T>;
  defaultValues?: DefaultValues<T>;
}
