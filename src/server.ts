import {createServer, IncomingMessage, Server, ServerResponse} from "node:http";
import {exec} from "node:child_process";

const urlSet = new Map<string, Record<string, any>>()

function configServer(port: number, resource: string): void {

    if (resource && port) exec(`start http://localhost:${port}/`)

    const server: Server<typeof IncomingMessage, typeof ServerResponse> = createServer(
        async (req: IncomingMessage, res: ServerResponse) => {
            if (req.method === 'GET' && req.url === '/') {
                try {
                    if (urlSet.size > 0 && urlSet.has(resource)) {

                        res.setHeader('ContentType', 'application/json')
                        res.setHeader('X-Cache', 'HIT')
                        res.end(JSON.stringify({status: 200, data: urlSet.get(resource)}))
                        return;
                    }

                    const response: Promise<Response> = await fetchData();

                    urlSet.set(resource, response)
                    res.setHeader('ContentType', 'application/json')
                    res.setHeader('X-Cache', 'MISS')

                    res.end(JSON.stringify({status: 200, data: urlSet.get(resource)}))

                } catch (e: unknown) {
                    res.end(JSON.stringify({status: 204, message: 'No content'}))
                }
            }

        })

    const fetchData = async (): Promise<any> => {
        const responseData: Response = await fetch(`https://dummyjson.com/${resource}`)
        return responseData.ok ? responseData.json() : Promise.reject(Error(await responseData.json()))
    }

    server.listen(port, (): void => {
        console.log("Server is listening to port " + port);
    })
}

function clearCache() {
    urlSet.clear();
}

export {configServer,clearCache}

//--port 3000 --origin http://dummyjson.com
// --port 3000 --origin http://localhost:3000/products
