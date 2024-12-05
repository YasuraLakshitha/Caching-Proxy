import * as readLine from "node:readline";
import {Interface} from "node:readline";
import {clearCache, configServer} from "./server";

const cli: Interface = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

cli.write("\t\tWelcome to caching proxy\n\n")
cli.write("\tInput format : --port <port> --origin <origin>\n\n")

cli.question("\tcaching-proxy:\t", (userInput: string): void => {
    if (/--port\s\d{4}\s--origin\s\S+/.test(userInput)) {
        const strings: string[] = userInput.split(" ")

        const port: number = parseInt(strings[1])
        const urlStrings: string[] = strings[strings.length - 1].split(/[/:]/)
        const resource: string = urlStrings[urlStrings.length - 1]

        if (urlStrings.indexOf(port.toString()) === -1) {
            cli.write("Port unmatched please type 'rs' to try again...\n")
        }
        configServer(port, resource)
    } else if ('clear cache'.trim().includes(userInput.toLowerCase().trim())) {
        clearCache()
        cli.write("\t\tCache cleared...")
    }

    else cli.write('Invalid input format, please type "rs" to try again...\n')
})
