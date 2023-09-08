import * as yup from "yup";

export const commentSchema = yup.object({
  content: yup
    .string()
    .test("maxline", "10줄 이하로 작성해주세요.", (value) => {
      const lines = value?.split("<p><br></p>");
      if (lines && lines.length > 10) {
        return false;
      }
      return true;
    })
    .max(255, "255자 이하로 작성해주세요.")
    .required("댓글을 작성해주세요."),
});
