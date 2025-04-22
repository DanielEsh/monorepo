import { CliArgs } from '../../create-cli';
import {logger} from "../../common/logger";
import chalk from 'chalk';
import {buildMode} from "../../common/types";
import path from 'node:path';
import { rspack } from '@rspack/core';
import { RspackDevServer, Configuration as DevServerOptions } from '@rspack/dev-server';
import {rspackConfigFactory} from "../../common/rspack/config";

export default async function dev(args: CliArgs) {
    process.env.NODE_ENV = buildMode.development;
    console.log(chalk.bgMagenta('\n running command: dev (test watch)'));
    console.log(chalk.bgHex('#184ea1')('Белый текст на фоне #184ea1'));
    console.log('Command arguments:', args);

    const config = rspackConfigFactory({
        buildMode: buildMode.development,
    })

    const devServerOptions: DevServerOptions = {
        port: 3000,
        static: path.resolve(process.cwd(), 'public'),
        hot: true,
        client: {
            overlay: true,
            logging: 'none',
        },
        devMiddleware: {
            stats: 'errors-warnings',
        },
        host: '0.0.0.0',
        allowedHosts: 'all',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        },
    };

    const compiler = rspack(config);

    compiler.hooks.done.tap('StartupLogger', (stats) => {
        if (!stats.hasErrors()) {
            console.log('> Rspack Dev Server запущен на http://localhost:3000');
        }
    });

    compiler.hooks.invalid.tap('InvalidLogger', () => {
        console.log('Файлы изменены, пересборка…');
    });
    compiler.hooks.done.tap('RebuildLogger', (stats) => {
        if (!stats.hasErrors()) {
            console.log(`Пересборка завершена: ${new Date().toLocaleTimeString()}`);
        }
    });

    const server = new RspackDevServer(devServerOptions, compiler);

    try {
        await server.start();
    } catch (e) {
        logger.logError(`Cannot start rspack dev server`, e);
    }
}