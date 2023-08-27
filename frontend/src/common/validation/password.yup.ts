import * as yup from "yup";
export const passwordSchema = yup.object({
  password: yup.string().required("패스워드를 입력해 주세요."),
  passwordConfirm: yup
    .string()
    .required("패스워들 입력해 주세요.")
    .oneOf([yup.ref("password")], "패스워가 일치하지 않습니다."),
});

export type passwordSchemaType = yup.InferType<typeof passwordSchema>;
