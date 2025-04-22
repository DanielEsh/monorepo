import type {Configuration} from '@rspack/core';
import type {BuildMode} from "../types";
import path from "node:path";

type ClientFactoryOptions = {
    buildMode: BuildMode;
    // config: NormalizedClientConfig;
    // configPath?: string;
};

export function rspackConfigFactory(options: ClientFactoryOptions): Configuration {

    const rsPackConfig: Configuration = {
        mode: options.buildMode,
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
    }

    return rsPackConfig
}