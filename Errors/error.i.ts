interface ApiError {
    name: string;
    code: number;
    message: string;
    description: string;
}


class ErrorVerification {
    protected error: ApiError;
    constructor(code: number, message: string, description: string) {
        this.error = {
            code: code,
            message: message,
            description: description
        }
    }
}

const verifyError = (code: number, message: string, description: string) => {
    if (!code) {
        throw new Error("Code is required");
    }
    if (!message) {
        throw new Error("Message is required");
    }
    if (!description) {
        throw new Error("Description is required");
    }
    return new ErrorVerification(code, message, description);
}


export interface INotFoundError extends ApiError {
    code: number;
    message: string;
    description: string;
}

export class NotFoundError extends ErrorVerification implements INotFoundError {
    constructor(code: number, message: string, description: string) {
        super(code, message, description);
    }
    code: number;
    message: string;
    description: string;
}

export interface IInternalServerError extends ApiError {
    code: number;
    message: string;
    description: string;
}

export class InternalServerError extends ErrorVerification implements IInternalServerError {
    constructor(code: number, message: string, description: string) {
        super(code, message, description);
    }
    code: number;
    message: string;
    description: string;
}


const verifyNotFoundError = (code: number, message: string, description: string) => {
    if (!code) {
        throw new Error("Code is required");
    }
    if (!message) {
        throw new Error("Message is required");
    }
    if (!description) {
        throw new Error("Description is required");
    }
    return new NotFoundError(code, message, description);
}



export default verifyError;