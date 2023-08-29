import { ValidationError } from "express-validator";
import { CommonError } from "./Common-error";

export class RequestValidationError extends CommonError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super();
  }

  serializeErrors() {
    return this.errors.map((err) => {
      if (err.type === "field") {
        return { message: err.msg, field: err.path };
      }
      return { message: err.msg };
    });
  }
}
