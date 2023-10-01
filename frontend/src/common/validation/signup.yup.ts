import * as yup from "yup";
import { emailSchema } from "./email.yup";
import { passwordSchema } from "./password.yup";

export const signupSchema = yup
  .object({
    nick: yup
      .string()
      .required("닉네임을 적어주세요.")
      .min(2, "닉네임은 2 - 10자를 입력해주세요.")
      .max(10, "닉네임은 2 - 10자를 입력해주세요."),
  })
  .concat(emailSchema)
  .concat(passwordSchema);

export type signupSchemaType = yup.InferType<typeof signupSchema>;
