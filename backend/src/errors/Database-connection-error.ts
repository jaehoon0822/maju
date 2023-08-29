import { CommonError } from "./Common-error";

export class DatabaseConnectionError extends CommonError {
  statusCode = 500;
  message = "데이터 베이스 connection Error";

  constructor() {
    super();
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
