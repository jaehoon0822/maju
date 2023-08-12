import { ForbiddenError } from "@/errors/forbidden-error";
import { NextFunction, Request, Response } from "express";

/**
 * @remarks
 * - 로그인되었으면 다음 처리 미들웨어로 이동하고,
 *   그렇지 않으면, ForbiddenError 호출
 * - 로그인 유저만 접근 가능하도록 만든 미들웨어
 * @param req
 * - Express.Request
 * @param _res
 * - Express.Response
 * @param next
 * - Express.NextFunction
 */
export const isLoggedIn = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  // passport 에서 req 에 생성해준 isAuthenticated 를 사용하여
  // 인증된 user 인지 확인
  if (req.isAuthenticated()) {
    next();
  } else {
    throw new ForbiddenError("로그인되지 않은 회원입니다.");
  }
};

/**
 * @remarks
 * - 로그인되지 않았으면 다음 처리 미들웨어로 이동하고,
 *   그렇지 않으면, ForbiddenError 호출
 * - 비로그인 유저만 접근 가능하도록 만든 미들웨어
 * @param req
 * - Express.Request
 * @param _res
 * - Express.Response
 * @param next
 * - Express.NextFunction
 */
export const isNotLoggedIn = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  // passport 에서 req 에 생성해준 isAuthenticated 를 사용하여
  // 인증된 user 인지 확인
  if (!req.isAuthenticated()) {
    next();
  } else {
    throw new ForbiddenError("이미 로그인된 회원입니다.");
  }
};
