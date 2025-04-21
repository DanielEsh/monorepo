import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import * as path from 'node:path';
import {logger} from './common/logger'

export type CliArgs = Awaited<ReturnType<typeof createCli>>;

export function createCli(argv: string[]) {
    const cli = yargs().parserConfiguration({
        'boolean-negation': false,
    });

    cli.scriptName('app-builder')
        .usage('Usage: $0 <command> [options]')
        .env('APP_BUILDER')
        .alias('h', 'help')
        .alias('v', 'version');

    try {
        cli.version(
            'version',
            'Show the version of the app-builder CLI package in the current project',
            getVersionInfo(),
        );
    } catch (e) {
        // ignore
    }

    return cli
        .option('verbose', {
            type: 'boolean',
            describe: 'Turn on verbose output',
            global: true,
        })
        .option('c', {
            alias: 'config',
            describe: 'Configuration file to use',
        })
        .command({
            command: 'dev',
            describe:
                'Start development server. Watches files, rebuilds, and hot reloads if something changes',
            builder: (_) =>
                _.option('target', {
                    describe: 'Select compilation unit',
                    choices: ['client', 'server'] as const,
                }),
            handler: handlerP(
                getCommandHandler('dev', (args, cmd) => {
                    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
                    cmd(args);
                    // Return an empty promise to prevent handlerP from exiting early.
                    // The development server shouldn't ever exit until the user directly
                    // kills it so this is fine.
                    return new Promise(() => {});
                }),
            ),
        })
        .command({
            command: 'build',
            describe: 'Make production build',
            builder: (_) =>
                _.option('target', {
                    describe: 'Select compilation unit',
                    choices: ['client', 'server'] as const,
                }),
            handler: handlerP(getCommandHandler('build')),
        })
        .wrap(cli.terminalWidth())
        .strict()
        .demandCommand(1, `Pass --help to see all available commands and options.`)
        .recommendCommands()
        .parse(hideBin(argv));
}

function getVersionInfo(): string {
    const {version} = require('../package.json');
    return `app-builder CLI version: ${version}`;
}

function handlerP(fn: (args: yargs.Arguments) => void) {
    return (args: yargs.Arguments): void => {
        Promise.resolve(fn(args)).then(
            () => process.exit(0),
            (err) => console.error(err) // TODO: добавить loader
        );
    };
}

function getCommandHandler(
    command: string,
    handler?: (args: any, cmd: (args: any) => void) => void,
): (argv: yargs.Arguments) => void {
    return async (argv) => {
        console.log('getCommandHandler')
        const localCmd = resolveLocalCommand(command);
        logger.verbose(`running command: ${command}`);
        return handler ? handler(argv, localCmd) : localCmd(argv);
    };
}

function resolveLocalCommand(command: string): ((...args: Array<unknown>) => void) | never {
    try {
        // const cmdPath = path.resolve(__dirname, `commands/${command}`);
        // if (!cmdPath) return logger.panic(`There was a problem loading the ${command} command.`);
        //
        // logger.verbose(`loading command from: ${cmdPath}`);
        //
        // // eslint-disable-next-line security/detect-non-literal-require
        // let cmd = require(cmdPath);
        // if (cmd.__esModule) {
        //     cmd = cmd.default;
        // }
        // if (typeof cmd === 'function') {
        //     return cmd;
        // }
        //
        // return logger.panic(`Handler for command "${command}" is not a function.`);

        console.log('resolveLocalCommand', command);

        const cmdPath = path.resolve(__dirname, `commands/${command}`);
        if (!cmdPath) return logger.panic(`There was a problem loading the ${command} command.`);

        // Динамический импорт команды
        const cmdModule = require(cmdPath);
        const commandFn = cmdModule.__esModule ? cmdModule.default : cmdModule;

        if (typeof commandFn !== 'function') {
            throw new Error(`Handler for command "${command}" is not a function`);
        }

        return commandFn;
    } catch (err) {
        console.log('[resolveLocalCommand] error', err)
        return logger.panic(`There was a problem loading the "${command}" command.`, err);
    }
}