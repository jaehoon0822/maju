import { DeepPartial, DeepRequired, FieldValues } from "react-hook-form";
import * as yup from "yup";

/****
 *
 *  quill 에디터 특성상
 *  모든 내용이 tag 를 포함한 결과값을 가짐
 *
 *  그러므로 tag 를 제외한 글자값을 추출하여
 *  검사해야할 필요가 있음
 *
 *  yup 에서 제공하는 메서드가 아닌 커스텀한 메서들 사용
 *  quill 에디터의 특성상
 *  <p>(.*)</p> 혹은 <p><br></p> 형태를 띔
 *
 */
export const postSchema = yup.object({
  content: yup
    .string()
    .test("empty", "글자를 입력해주세요.", (value) => {
      if (value) {
        // p태그들을 검색
        const lines = value.match(/<p>(.*?)<\/p>/g);
        // 일치하는 내용이 없다면 에러 발생
        if (!lines) return false;
        // filter 를 사용하여 <p><br></p> 제거후 length 값이 0보다 큰지 확인
        return lines.filter((line) => line !== "<p><br></p>").length > 0;
      }
      // value 가 없다면, 에러 발생
      return false;
    })
    .test("maxline", "10줄 이하로 작성해주세요.", (value) => {
      // p태그들을 검색
      const lines = value?.match(/<p>(.*?)<\/p>/g);
      // lines 의 length 가 10보다 크면 에러발생
      if (lines && lines.length > 10) {
        return false;
      }
      // 그렇지 않으면 통과
      return true;
    })
    .test("max", "255자 이하로 작성해주세요.", (value) => {
      if (value) {
        // 모든 글자를 추출하기 위해 모든 태그를 추출
        const contents = Array.from(
          value.match(/<[^>]*>([^<]*)<[^<]*>/g) ?? []
        );
        // 추출한 태그에서 모든 태그들을 빈문자열로 치환이후
        // 빈문자열을 제외한 내용물을 join
        const innerText = contents
          .map((content) => content.replace(/<[^>]*>/g, ""))
          .join("");

        // 내용물의 길이가 255자 이하인지 확인
        return innerText.length < 255;
      }
    })
    .required("댓글을 작성해주세요."),
  img: yup.array().max(4, "4개의 이미지를 등록해주세요.").required(),
});
export type postType = yup.InferType<typeof postSchema>;
