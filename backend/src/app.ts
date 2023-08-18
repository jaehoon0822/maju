import path from "path";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import "express-async-errors";
import session from "express-session";
import passport from "passport";
import { passportConfig } from "./passport";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { authRouter } from "./routes/auth";
import { postRouter } from "./routes/post";
import { userRouter } from "./routes/user";

const app = express();
// port 설정
app.set("PORT", process.env.PORT || 8080);
// morgan logger 설정
app.use(morgan(process.env.NODE_ENV === "development" ? "combined" : ""));
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
app.use(passport.session());
// passport config 적용
passportConfig(passport);
// image 경로
app.use("/img", express.static(path.join(__dirname, "uploads")));

/************ Routes *************/
// auth route
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);
/************ Routes *************/

// 해당하는 Router 없을시 NotFoundError 발생
app.get("*", (_req: Request, _res: Response, _next: NextFunction) => {
  throw new NotFoundError();
});
// Error middleware 를 사용하여 Error 처리
app.use(errorHandler);

// 만들어진 App 객체 반환
// index.ts 에서 해당 app 실행
export { app };
