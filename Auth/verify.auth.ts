import { AuthenticatedServerRequest } from "./auth.i";


export interface IAuth {
    mapleradio(req: AuthenticatedServerRequest): Promise<AuthenticatedServerRequest>;
    fincradio(req: AuthenticatedServerRequest): Promise<AuthenticatedServerRequest>;
    risevest(req: AuthenticatedServerRequest): Promise<AuthenticatedServerRequest>;
}

class Authenication implements IAuth {
    async mapleradio(req: AuthenticatedServerRequest): Promise<AuthenticatedServerRequest> {
        if (!req) {
            throw new Error("Request is required");
        }
        return req;
    }

    async fincradio(req: AuthenticatedServerRequest): Promise<AuthenticatedServerRequest> {
        if (!req) {
            throw new Error("Request is required");
        }
        return req;
    }

    async risevest(req: AuthenticatedServerRequest): Promise<AuthenticatedServerRequest> {
        if (!req) {
            throw new Error("Request is required");
        }
        return req;
    }
}