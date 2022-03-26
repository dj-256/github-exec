import {ExecClient} from "./ExecClient";
import {ExecActionOptions} from "./ExecActionOptions";

export class ExecAction {
    client: ExecClient

    constructor() {
        this.client = new ExecClient()
    }

    async execCommand(options: ExecActionOptions): Promise<void> {
        try {
            await this.client.connect(options)
            let commands = options.command.split(/\n/)
            console.log(`commands: ${commands}`)

            for (let command of commands) {
                await this.client.exec(command)
            }
        } catch (e) {
            console.error(e)
        }
    }
}
