import { ExecClient } from "./ExecClient"
import { ExecActionOptions } from "./ExecActionOptions"

export class ExecAction {
  client: ExecClient
  commandInput: string

  constructor() {
    this.client = new ExecClient()
    this.commandInput = ""
  }

  connect = (options: ExecActionOptions) => this.client.connect(options)
    .then(() => this.commandInput = options.command)

  exec = () => this.execCommand(this.commandInput.split("\n"))

  execCommand = (command: string[]): Promise<void> => {
    const commandLine = command.shift()
    if (!commandLine) return Promise.resolve()
    return this.client.exec(commandLine).then(() => this.execCommand(command))
  }
}
