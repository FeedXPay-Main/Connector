interface Server {
    url: string;
    name: string;
    description: string;
    variables: [];
}


class ServerVerification {
    protected server: Server;
    constructor(url: string, name: string, description: string, variables: []) {
        this.server = {
            url: url,
            name: name,
            description: description,
            variables: variables
        }
    }
}


const verifyServer = (url: string, name: string, description: string, variables: []) => {
    if (!url) {
        throw new Error("Url is required");
    }
    if (!name) {
        throw new Error("Name is required");
    }
    if (!description) {
        throw new Error("Description is required");
    }
    if (!variables) {
        throw new Error("Variables is required");
    }
    return new ServerVerification(url, name, description, variables);
}


export default verifyServer;