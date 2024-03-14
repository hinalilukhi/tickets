import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    statusCode  = 500;
    reason = "data base connection failed";

    constructor() {
        super("Error connecting to db");
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
      }
    
    serializeError() { 
        return [{message: this.reason }]
    }
}