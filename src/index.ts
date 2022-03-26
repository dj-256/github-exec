import * as core from '@actions/core';
import * as ini from 'ini';
import * as fs from 'fs';
import {ExecAction} from './ExecAction';

async function run(): Promise<any> {
    let execAction = new ExecAction()

    if (process.env.GITHUB_ACTION_ENV === 'test') {
        let config = ini.parse(fs.readFileSync('config.ini', 'utf-8'));
        let options = config.options

        try {
            await execAction.execCommand(options)
        } catch (e) {
            console.error(e.message)
            process.exit(1)
        }
    } else {
        try {
            await execAction.execCommand({
                host: core.getInput('host'),
                username: core.getInput('username'),
                password: core.getInput('password'),
                port: +core.getInput('port') || 22,
                command: core.getInput('command'),
            })
        } catch (e) {
            console.error(e.message)
            process.exit(1)
        }
    }
    let errors = execAction.client.errors
    if (errors > 0) {
        console.error(`\n${errors} error${errors > 1 ? 's' : ''}`)
        process.exit(1)
    }
}

run()
.then(() => {
    process.exit(0)
})
