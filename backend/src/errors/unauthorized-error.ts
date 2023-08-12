import { commonError } from "./common-error";

export class UnauthorizedError extends commonError {
  statusCode: number = 401;
  message = "인증되지 않았습니다.";

  constructor() {
    super();
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
