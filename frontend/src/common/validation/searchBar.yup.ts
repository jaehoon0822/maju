import * as yup from "yup";

export const searchBarSchema = yup.object({
  search: yup
    .string()
    .required("글자를 입력해 주세요.")
    .min(1, "1자 이상 입력해주세요"),
});
