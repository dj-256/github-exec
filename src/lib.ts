import {ExecClient} from "./ExecClient";
import {ExecActionOptions} from "./ExecActionOptions";

export class ExecAction {
    client: ExecClient

    constructor() {
        this.client = new ExecClient()
    }

    execCommand(options: ExecActionOptions): Promise<void> {
        return this.client.connect(options)
            .then(() => this.client.exec(options.command))
            .catch(e => console.log(e))
    }
}
