import { commonError } from "@/errors/common-error";
import { NextFunction, Request, Response } from "express";

/**
 * @remarks
 * - Error 처리를 위한 handler
 * @param err
 * - Error
 * @param _req
 * - Express.Requst (사용안함)
 * @param res
 * - Express.Response
 * @param _next
 * - Express.NextFunction (사용안함)
 * @returns
 */
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // CommonError class 의 instance 인지 확인
  if (err instanceof commonError) {
    // 맞다면 err.statusCode 및 err.serializeErrors 를 send

    return res.status(err.statusCode).send(err.serializeErrors());
  }

  // 그렇지 않다면 400, 및 err.message send
  return res.status(400).send({
    message: err.message,
  });
};
