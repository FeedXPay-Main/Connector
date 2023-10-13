import {Request, Response} from "express";

export interface IAuth {
    login(req: Request, res: Response): Promise<Response>;
    register(req: Request, res: Response): Promise<Response>;
    logout(req: Request, res: Response): Promise<Response>;
}
 
export interface IAuthenticatedRequest extends Request {
    user: any;
    email: string;
    money : number;
}




const verifyAuthenticatedRequest = (user: any, email: string) => {
    if (!user) {
        throw new Error("User is required");
    }
    if (!email) {
        throw new Error("Email is required");
    }
    return {user, email};
}


const me: IAuthenticatedRequest = new 


class Authenication implements IAuth {
    async login(req: Request, res: Response): Promise<Response> {
        r
        return res.status(200).json({message: "Login"});
    }

    async register(req: Request, res: Response): Promise<Response> {
        return res.status(200).json({message: "Register"});
    }

    async logout(req: IAuthenticatedRequest, res: Response): Promise<Response> {
        return res.status(200).json({message: "Logout"});
    }
}


export interface AuthenticatedServerRequest extends IAuthenticatedRequest {
    server: any;
}