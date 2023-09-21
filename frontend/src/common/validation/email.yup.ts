import * as yup from "yup";

export const emailSchema = yup.object({
  email: yup
    .string()
    .email("형식에 맞지 않는 이메일 입니다.")
    .required("이메일을 입력해 주세요."),
});

export type emailSchemaType = yup.InferType<typeof emailSchema>;
