import { ValidationError } from "express-validator";
import { commonError } from "./common-error";

export class RequestValidationError extends commonError {
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
