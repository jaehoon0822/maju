import * as dotenv from "dotenv";
import path from "path";

// env 파일을 환경에 따라 다르게 불러오는 로직
export const getEnv = () => {
  // 환경변수가 development 일때 .env.dev 실행
  if (process.env.NODE_ENV === "development") {
    return dotenv.config({ path: path.join(__dirname, "../env/.env.dev") });
    // 환경변수가 production 일때 .env.dev 실행
  } else if (process.env.NODE_ENV === "production") {
    return dotenv.config({ path: path.join(__dirname, "../env/.env.prod") });
    // 해당하는 환경변수가 없다면 Error 발생
  } else {
    throw new Error("잘못된 process.env.NODE_ENV 입니다.");
  }
};
