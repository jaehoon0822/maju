import { CommonError } from "./Common-error";

export class UnauthorizedError extends CommonError {
  statusCode: number = 401;
  message = "인증되지 않았습니다.";

  constructor() {
    super();
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
