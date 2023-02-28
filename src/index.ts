import * as dotenv from "dotenv"
import * as core from "@actions/core"
import { ExecAction } from "./ExecAction"

dotenv.config()

const run = () => {
    const execAction = new ExecAction()

    if (process.env.GITHUB_ACTION_ENV === "test") {
        const options = {
            host: process.env.TEST_HOST || "",
            username: process.env.TEST_USERNAME || "",
            password: process.env.TEST_PASSWORD,
            port: +(process.env.TEST_PORT || 22),
            command: process.env.TEST_COMMAND || "",
            privateKey: process.env.TEST_PRIVATE_KEY,
            passphrase: process.env.TEST_PASSPHRASE,
        }

        return execAction.connectAndExec(options).catch((e) => {
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
                privateKey: core.getInput("privateKey"),
                passphrase: core.getInput("pprase"),
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
