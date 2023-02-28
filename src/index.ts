import * as core from "@actions/core"
import * as ini from "ini"
import * as fs from "fs"
import { ExecAction } from "./ExecAction"

const run = () => {
  const execAction = new ExecAction()

  if (process.env.GITHUB_ACTION_ENV === "test") {
    const config = ini.parse(fs.readFileSync("config.ini", "utf-8"))
    const options = config.options

    return execAction.execCommand(options).catch((e) => {
      console.error(e)
      process.exit(1)
    })
  } else {
    return execAction
      .connect({
        host: core.getInput("host"),
        username: core.getInput("username"),
        password: core.getInput("password"),
        port: +core.getInput("port") || 22,
        command: core.getInput("command"),
      })
      .then(() => execAction.exec())
      .then(() => {
        const errors = execAction.client.errors
        if (errors > 0) {
          console.error(`\n${errors} error${errors > 1 ? "s" : ""}`)
          process.exit(1)
        }
      })
      .catch((e) => {
        console.error(e)
        process.exit(1)
      })
  }
}

run().then(() => {
  process.exit(0)
})
