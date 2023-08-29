import { CommonError } from "./Common-error";

export class ConflictError extends CommonError {
  statusCode: number = 409;
  message = "유효하지 않은 유저입니다.";
  private errors: ConflictError[] | undefined;

  constructor(msg?: string, readonly field?: string) {
    super();
    if (msg) {
      if (field) this.field = field;
      this.message = msg;
    }
  }

  toArray(errors: ConflictError[]) {
    this.errors = errors;
    return this;
  }

  serializeErrors():
    | ConflictError[]
    | { message: string; field?: string | undefined } {
    if (this.errors) {
      return this.errors;
    }
    if (this.field) {
      return { message: this.message, field: this.field };
    }
    return { message: this.message };
  }
}
