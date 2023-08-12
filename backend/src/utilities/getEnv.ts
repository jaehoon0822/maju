import * as dotenv from "dotenv";
import path from "path";

export const getEnv = () => {
  console.log(path.join(__dirname, "@/env/.env.dev"));
  if (process.env.NODE_ENV === "development") {
    return dotenv.config({ path: path.join(__dirname, "../env/.env.dev") });
  } else if (process.env.NODE_ENV === "production") {
    return dotenv.config({ path: path.join(__dirname, "../env/.env.prod") });
  } else {
    throw new Error("잘못된 process.env.NODE_ENV 입니다.");
  }
};
