import * as readLine from "node:readline";
import {Interface} from "node:readline";

const cli: Interface = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

cli.question("caching-proxy ", (userInput: string) => {
    console.log(userInput)
})
