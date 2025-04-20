import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import * as path from 'node:path';

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
                () => {
                    console.log('Hello world')
                }
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
): (argv: yargs.Arguments) => void {
    return async (argv) => {
        // const config = await getProjectConfig(command, argv as CliArgs);
        // logger.setVerbose(Boolean(config.verbose));
        //
        // const args = {...config, logger};
        // const localCmd = resolveLocalCommand(command);
        //
        // logger.verbose(`running command: ${command}`);
        // return handler ? handler(args, localCmd) : localCmd(args);

        console.log('getCommandHandler', command);
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
        return null
    } catch (err) {
        console.log('[resolveLocalCommand] error', err)
        // return logger.panic(`There was a problem loading the "${command}" command.`, err);
    }
}