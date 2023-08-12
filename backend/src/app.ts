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

getEnv();

const app = express();
app.set("PORT", process.env.PORT || 8080);

app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : ""));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (_req: Request, res: Response) => {
  return res.status(200).send("Hello My World");
});

app.get("*", (_req: Request, _res: Response, _next: NextFunction) => {
  throw new notFoundError();
});

app.use(errorHandler);

export { app };
