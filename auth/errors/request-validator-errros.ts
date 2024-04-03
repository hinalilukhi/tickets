import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
    statusCode = 500;

    constructor(public errors: ValidationError[]){
        super('Invalid request parameter')
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeError() {
        return this.errors.map((err) => {
            if (err.type === 'field') {
              return { message: err.msg, field: err.path };
            }
            return { message: err.msg };
          });
    }

}