import * as readLine from "node:readline";
import {Interface} from "node:readline";
import {configServer} from "./server";

const cli: Interface = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

cli.write("Welcome to caching proxy\n")
cli.write("Format : --port <port> --origin <origin>\n")

cli.question("caching-proxy ", (userInput: string): void => {
    if (/--port\s\d{4}\s--origin\s\S+/.test(userInput)) {
        const strings: string[] = userInput.split(" ")

        const port: number = parseInt(strings[1])
        const urlStrings: string[] = strings[strings.length - 1].split("/")
        const resource: string = urlStrings[urlStrings.length - 1]

        configServer(port, resource)
    }
})
