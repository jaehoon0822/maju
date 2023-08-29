import * as yup from "yup";

export const codeSchema = yup.object({
  code: yup.string().required("검증코드를 입력해주세요."),
});

export type codeSchemaType = yup.InferType<typeof codeSchema>;
