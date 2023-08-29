import * as yup from "yup";
import { emailSchema } from "./email.yup";
import { passwordSchema } from "./password.yup";

export const loginSchema = yup
  .object({})
  .concat(emailSchema)
  .concat(passwordSchema)
  .omit(["passwordConfirm"]);

export type loginSchemaType = yup.InferType<typeof loginSchema>;
