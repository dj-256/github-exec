import * as ssh2 from 'ssh2';
import { Client } from "ssh2";
import { EventEmitter } from "events";


export class ExecClient extends EventEmitter {
    client: Client

    constructor() {
        super()
        this.client = new Client()
    }

    connect(options: ssh2.ConnectConfig): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                this.client.on('ready', () => resolve()).connect(options)
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
                    stream.on('close', (code: any, signal: any) => {
                        console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                        resolve()
                    }).on('data', (data: any) => {
                        console.log('STDOUT: ' + data);
                    }).stderr.on('data', (data) => {
                        console.log('STDERR: ' + data);
                    });
                })
            } catch (e) {
                reject()
            }
        })
    }
}