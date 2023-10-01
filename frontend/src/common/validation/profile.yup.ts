import * as yup from "yup";

// profileSchema 의 yup 객체 생성
export const profileSchema = yup.object({
  coverImage: yup.string().notRequired(),
  avatar: yup.string().notRequired(),
  coverLetter: yup
    .string()
    .test("maxline", "10줄 이하로 작성해주세요.", (value) => {
      const regex = /<p>(.*?)<\/p>/g;
      if (value) {
        const lines = Array.from(value.match(regex) ?? []);
        if (lines && lines.length > 10) {
          return false;
        }
      }
      return true;
    })
    .test("max", "255자 이하로 작성해주세요.", (value) => {
      if (value) {
        const contents = Array.from(
          value.match(/<[^>]*>([^<]*)<[^<]*>/g) ?? []
        );
        const innerText = contents
          .map((content) => content.replace(/<[^>]*>/g, ""))
          .join("");
        if (innerText === "") return true;
        return innerText.length < 255;
      }
      return true;
    })
    .required("자기소개를 해주세요"),
  nick: yup
    .string()
    .max(30, "30자 이하로 작성해주세요.")
    .min(1, "1자 이상 작성해주세요."),
});

// profileSchemaType 추출
export type profileSchemaType = yup.InferType<typeof profileSchema>;
