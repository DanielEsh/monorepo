import { CliArgs } from '../../create-cli';
import {logger} from "../../common/logger";
import chalk from 'chalk';
import {Mode} from "../../common/types";
import path from 'node:path';
import { rspack, Configuration as RspackConfiguration } from '@rspack/core';
import { RspackDevServer, Configuration as DevServerOptions } from '@rspack/dev-server';

export default async function dev(args: CliArgs) {
    process.env.NODE_ENV = Mode.development;
    console.log(chalk.bgMagenta('\n running command: dev (test watch)'));
    console.log(chalk.bgHex('#184ea1')('Белый текст на фоне #184ea1'));
    console.log('Command arguments:', args);

    const config: RspackConfiguration = {
        mode: 'development',
        entry: path.resolve(process.cwd(), 'src/index.tsx'),
        output: {
            path: path.resolve(process.cwd(), 'dist'),
            filename: 'bundle.js',
            publicPath: '/build/',
        },
        infrastructureLogging: { level: 'error' },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'builtin:swc-loader',
                    options: {
                        jsc: {
                            parser: { syntax: 'typescript', tsx: true },
                            transform: { react: { runtime: 'automatic' } },
                        },
                    },
                    type: 'javascript/auto',
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        // здесь можно добавить loaders/plugins...
    };

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
        }
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

    await server.start();


}