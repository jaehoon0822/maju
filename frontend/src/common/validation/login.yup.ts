import * as yup from "yup";
<<<<<<< HEAD

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("내용을 입력해주세요.")
    .min(2, "최소 2자 이상 입력해주세요.")
    .max(20, "최대 20자 이하로 입력해주세요.")
    .email("이메일 형식에 맞춰 작성해주세요."),
  password: yup
    .string()
    .required("내용을 입력해주세요.")
    .min(6, "최소 6자 이상 입력해주세요.")
    .max(16, "최대 16자 이상 입력해주세요."),
});
=======
import { emailSchema } from "./email.yup";
import { passwordSchema } from "./password.yup";

export const loginSchema = yup
  .object({})
  .concat(emailSchema)
  .concat(passwordSchema)
  .omit(["passwordConfirm"]);

export type loginSchemaType = yup.InferType<typeof loginSchema>;
>>>>>>> feature
