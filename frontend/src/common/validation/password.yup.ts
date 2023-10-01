import * as yup from "yup";
export const passwordSchema = yup.object({
  password: yup
    .string()
    .required("패스워드를 입력해 주세요.")
    .min(8, "8이상 20자이하로 적어주세요.")
    .max(20, "6이상 20자이하로 적어주세요.")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/,
      "특수문자 및 숫자가 포함되어야 합니다."
    ),
  passwordConfirm: yup
    .string()
    .required("패스워들 입력해 주세요.")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/,
      "특수문자 및 숫자가 포함되어야 합니다."
    )
    .oneOf([yup.ref("password")], "패스워가 일치하지 않습니다."),
});

export type passwordSchemaType = yup.InferType<typeof passwordSchema>;
