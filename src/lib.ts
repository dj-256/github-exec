import {ExecClient} from "./ExecClient";
import {ExecActionOptions} from "./ExecActionOptions";

export class ExecAction {
    client: ExecClient

    constructor() {
        this.client = new ExecClient()
    }

    execCommand(options: ExecActionOptions): Promise<void|void[]> {
        return this.client.connect(options)
            .then(() => {
                let commands = options.command.split(/\n/)
                return Promise.all(commands.map(command => {
                    console.log(`IN: ${command}`)
                    return this.client.exec(command)
                }))
            })
            .catch(e => console.log(e))
    }
}
