
// custom error class for standardized error response

export class ApiError extends Error {

    constructor(statusCode, message = "something went wrong", errors=[], stack=""){

        super(message)
        this.statusCode = statusCode;
        this.message = message;
        this.data = null;
        this.success = false;
        this.errors = errors;

        if(stack){
            this.stack = stack              // If someone gives us a custom stack trace, use it.
        }else{
            Error.captureStackTrace(this,this.constructor)    // otherwise ,generates one
        }
    }
}