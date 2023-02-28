import * as ssh2 from "ssh2"
import { Client } from "ssh2"
import { EventEmitter } from "events"

export class ExecClient extends EventEmitter {
    client: Client
    errors: number

    constructor() {
        super()
        this.client = new Client()
        this.errors = 0
    }

    connect(options: ssh2.ConnectConfig): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                this.client.on("ready", () => resolve()).connect(options)
            } catch (e) {
                reject(e)
            }
        })
    }

    exec(command: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                this.client.exec(command, (err, stream) => {
                    if (err) reject(err)
                    console.log(`> ${command}`)
                    stream
                        .on("close", (code: never) => {
                            code !== 0 && this.errors++
                            resolve()
                        })
                        .on("data", (data: never) => {
                            process.stdout.write(data)
                        })
                        .stderr.on("data", (data) => {
                            process.stderr.write(data)
                        })
                })
            } catch (e) {
                reject(e)
            }
        })
    }
}
