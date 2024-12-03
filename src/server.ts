import {createServer, IncomingMessage, Server, ServerResponse} from "node:http";

function configServer(port: number, url: string,): void {

    const server: Server<typeof IncomingMessage, typeof ServerResponse> = createServer()

    server.listen(port, (): void => {
        console.log("Server is listening to port " + port);
    })
}

export {configServer}



