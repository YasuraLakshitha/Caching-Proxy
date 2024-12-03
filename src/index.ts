import * as readLine from "node:readline";
import {Interface} from "node:readline";
import {configServer} from "./server";

const cli: Interface = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

cli.question("caching-proxy ", (userInput: string) => {
    if (!/--port\s\d{4}\s--origin\s\S+/.test(userInput)) {
        const strings: string[] = userInput.split(" ")

        const port: number = parseInt(strings[1])
        const url: string = strings[strings.length]

        configServer(port, url)
    }
})
