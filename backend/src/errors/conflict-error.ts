import { commonError } from "./common-error";

export class ConflictError extends commonError {
  statusCode: number = 409;
  message = "유효하지 않은 유저입니다.";

  constructor(readonly msg?: string) {
    super();
    if (msg) this.message = msg;
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
