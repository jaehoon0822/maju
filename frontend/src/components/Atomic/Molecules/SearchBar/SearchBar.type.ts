import { FieldValues, SubmitHandler } from "react-hook-form";

export interface SearchBarProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
}
