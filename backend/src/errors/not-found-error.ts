import { commonError } from "./common-error";

export class NotFoundError extends commonError {
  message = "페이지를 찾을수 없습니다.";
  statusCode: number = 404;
  constructor(readonly msg?: string) {
    super();
    if (msg) this.message = msg;
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: this.message,
      },
    ];
  }
}
