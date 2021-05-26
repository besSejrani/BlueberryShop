import { CustomError } from "./CustomError";

export class DatabaseConnectionError extends CustomError {
  reason = "Error connecting to database";

  statusCode = 500;

  constructor() {
    super("Error connecting to db");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  public serializeErrors() {
    return [{ message: this.reason, statusCode: this.statusCode }];
  }
}
