import * as readLine from "node:readline";
import {Interface} from "node:readline";

const cli: Interface = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

cli.question("caching-proxy ", (userInput: string) => {
    if (!/--port\s\d{4}\s--origin\s\S+/.test(userInput)) {
        const strings: string[] = userInput.split(" ")

        const port: number = parseInt(strings[1])
        const urlStrings: string[] = strings[strings.length - 1].split("/")
        const resouce: string = urlStrings[urlStrings.length - 1]

    }
})
