import * as core from '@actions/core';
import * as ini from 'ini';
import * as fs from 'fs';
import { ExecAction } from './lib';

function run(): Promise<any> {
    let execAction = new ExecAction()
    console.log(process.env.NODE_ENV)

    if (process.env.GITHUB_ACTION_ENV === 'test') {
        let config = ini.parse(fs.readFileSync('config.ini', 'utf-8'));
        let options = config.options
        console.log(options)
        return execAction.execCommand(
            options
        )
    } else {
        return execAction.execCommand({
            host: core.getInput('host'),
            username: core.getInput('username'),
            password: core.getInput('password'),
            port: +core.getInput('port') || 22,
            command: core.getInput('command'),
        })
    }
}

run()
.then(() => {
    console.log('done')
    process.exit(0)
})
