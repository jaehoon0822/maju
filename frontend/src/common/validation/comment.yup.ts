import * as yup from "yup";

export const commentSchema = yup.object({
  content: yup
    .string()
    .test("empty", "글자를 작성해주세요.", (value) => {
      if (value) {
        const regex = /<p>(.*?)<\/p>/g;
        const lines = value.match(regex);
        if (!lines) return false;
        return lines.filter((line) => line != "<p><br></p>").length > 0;
      }
    })
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
        return innerText.length < 255;
      }
    })
    .required("댓글을 작성해주세요."),
});

export type commentSchemaType = yup.InferType<typeof commentSchema>;
