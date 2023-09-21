import { CommonError } from "./Common-error";

export class ForbiddenError extends CommonError {
  message = "웹 페이지를 볼 수 있는 권한이 없습니다.";
  statusCode: number = 403;
  constructor(readonly msg?: string) {
    super();
    if (msg) {
      this.message = msg;
    }
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: this.message,
      },
    ];
  }
}
