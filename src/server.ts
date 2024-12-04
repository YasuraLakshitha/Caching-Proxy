import {createServer, IncomingMessage, Server, ServerResponse} from "node:http";
import {exec} from "node:child_process";

function configServer(port: number, resource: string,): void {

    const server: Server<typeof IncomingMessage, typeof ServerResponse> = createServer(
        (req: IncomingMessage, res: ServerResponse) => {
            if (req.method === 'GET' && req.url === '/') {
                try {
                    fetchData();
                } catch (e) {
                    console.log(e)
                }finally {
                    server.emit('close')
                }

            }
        })

    const fetchData = () => {
        exec(`start https://dummyjson.com/${resource}`)
    }

    server.listen(port, (): void => {
        console.log("Server is listening to port " + port);
    })
}

export {configServer}


//--port 3000 --origin http://dummyjson.com
// --port 3000 --origin http://localhost:3000/products
