import {createServer, IncomingMessage, Server, ServerResponse} from "node:http";

const urlSet = new Map<string, Record<string, any>>()

function configServer(port: number, resource: string,): void {

    const server: Server<typeof IncomingMessage, typeof ServerResponse> = createServer(
        async (req: IncomingMessage, res: ServerResponse) => {
            if (req.method === 'GET' && req.url === '/') {
                try {
                    if (urlSet.size > 0 && urlSet.has(resource)) {
                        prompt("X-Cache: HIT")

                        res.setHeader('ContentType', 'application/json')
                            .setHeader('X-Cache','HIT')

                        res.end(JSON.stringify({status: 200, data: urlSet.get(resource)}))
                    }
                    prompt("X-Cache: MISS")

                    const response: Promise<Response> = await fetchData();

                    urlSet.set(resource, response)
                    res.setHeader('ContentType', 'application/json')
                        .setHeader('X-Cache', 'MISS')

                    res.end(JSON.stringify({status: 200, data: urlSet.get(resource)}))

                } catch (e: unknown) {
                    throw Error("Operation unsuccessful")
                } finally {
                    server.emit('close')
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

export {configServer}


//--port 3000 --origin http://dummyjson.com
// --port 3000 --origin http://localhost:3000/products
