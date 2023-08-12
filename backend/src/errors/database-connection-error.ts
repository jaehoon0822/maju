import { commonError } from "./common-error";

export class DatabaseConnectionError extends commonError {
  statusCode = 500;
  message = "데이터 베이스 connection Error";

  constructor() {
    super();
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
