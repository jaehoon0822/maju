import path from "path";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import "express-async-errors";
import session from "express-session";
import passport from "passport";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import { passportConfig } from "./passport";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/Not-found-error";
import { authRouter } from "./routes/auth";
import { postRouter } from "./routes/post";
import { userRouter } from "./routes/user";
import { mailRouter } from "./routes/mail";
import { likeRouter } from "./routes/like";
import { commentRouter } from "./routes/comment";

const app = express();
// port 설정
app.set("PORT", process.env.PORT || 8080);
// cors 설정
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      // , process.env.PUBLIC_IMAGE_URL || ""
    ],
    credentials: true,
  })
);
// 보안관리
if (process.env.NODE_ENV === "production") {
  app.use(helmet({}));
  app.use(hpp());
}
// morgan logger 설정
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));
// static 폴더 설정
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));
// http 요청 메시지 형식(body)을 JSON 으로 해석
app.use(express.json());
// http 요청 시 URL-encoded 형식을 해석하여 객체로 변환(body)
// qs library 사용하지 않음
app.use(express.urlencoded({ extended: true }));
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
app.use("/mail", mailRouter);
app.use("/like", likeRouter);
app.use("/comment", commentRouter);
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
