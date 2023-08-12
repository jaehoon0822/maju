import path from "path";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import "express-async-errors";
import session from "express-session";
import { passportConfig } from "./passport";
import { errorHandler } from "./middlewares/errorr-handler";
import { notFoundError } from "./errors/not-found-error";
import { getEnv } from "@/utilities/getEnv";
import passport from "passport";

// env 파일 호출
// development 혹은 production 환경인지에 따라
// 적용할 env 를 선택해주는 함수
getEnv();

const app = express();
// port 설정
app.set("PORT", process.env.PORT || 8080);

// morgan logger 설정
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : ""));
// static 폴더 설정
app.use(express.static(path.join(__dirname, "public")));
// http 요청 메시지 형식(body)을 JSON 으로 해석
app.use(express.json());
// http 요청 시 URL-encoded 형식을 해석하여 객체로 변환(body)
// qs library 사용하지 않음
app.use(express.urlencoded({ extended: false }));

// express-session 설정
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET || "",
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

// passport 초기화
app.use(passport.initialize());
// passport session 활성화
// middleware 특성상
// express session 다음에 있어야함
app.use(passport.session());

// 해당하는 Router 없을시 NotFoundError 발생
app.get("*", (_req: Request, _res: Response, _next: NextFunction) => {
  throw new notFoundError();
});

// Error middleware 를 사용하여 Error 처리
app.use(errorHandler);

// 만들어진 App 객체 반환
// index.ts 에서 해당 app 실행
export { app };
