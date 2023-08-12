import { commonError } from "./common-error";

export class notFoundError extends commonError {
  message = "페이지를 찾을수 없습니다.";
  statusCode: number = 404;
  constructor() {
    super();
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: this.message,
      },
    ];
  }
}
