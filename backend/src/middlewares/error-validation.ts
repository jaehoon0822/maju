import { RequestValidationError } from "@/errors/request-validation-error";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const errorValidation = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    throw new RequestValidationError(result.array());
  }

  return next();
};
