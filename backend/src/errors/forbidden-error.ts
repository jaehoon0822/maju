import { commonError } from "./common-error";

export class ForbiddenError extends commonError {
  message = "웹 페이지를 볼 수 있는 권한이 없습니다.";
  statusCode: number = 403;
  constructor(private msg?: string) {
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
