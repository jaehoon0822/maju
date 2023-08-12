import { commonError } from "@/errors/common-error";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof commonError) {
    return res.status(err.statusCode).send(err.serializeErrors());
  }

  res.status(400).send({
    message: err.message,
  });
};
