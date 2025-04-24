import type {Configuration, RuleSetUseItem} from '@rspack/core';
import type {BuildMode} from "../types";
import * as path from 'node:path';

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
                // TypeScript & JSX (SWC)
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

                // Plain CSS
                {
                    test: /(?<!\.module)\.css$/i,
                    use: [
                        require.resolve('style-loader'),
                        require.resolve('css-loader'),
                        require.resolve('postcss-loader'),
                    ],
                },
                // CSS Modules
                {
                    test: /\.module\.css$/i,
                    use: [
                        require.resolve('style-loader'),
                        {
                            loader: require.resolve('css-loader'),
                            options: {
                                modules: {
                                    localIdentName: '[name]__[local]--[hash:base64:5]',
                                },
                            },
                        },
                    ],
                },
                // // Plain LESS
                {
                    test: /(?<!\.module)\.less$/i,
                    use: [
                        require.resolve('style-loader'),
                        require.resolve('css-loader'),
                        require.resolve('postcss-loader'),
                        require.resolve('less-loader'),
                    ],
                },
                // // LESS Modules
                {
                    test: /\.module\.less$/i,
                    use: [
                        require.resolve('style-loader'),
                        {
                            loader: require.resolve('css-loader'),
                            options: {
                                modules: {
                                    localIdentName: '[name]__[local]--[hash:base64:5]',
                                },
                            },
                        },
                        require.resolve('postcss-loader'),
                        require.resolve('less-loader'),
                    ],
                },
                // // Plain SASS/SCSS
                {
                    test: /(?<!\.module)\.s[ac]ss$/i,
                    use: [
                        require.resolve('style-loader'),
                        require.resolve('css-loader'),
                        require.resolve('postcss-loader'),
                        require.resolve('sass-loader'),
                    ],
                },
                // // SASS/SCSS Modules
                {
                    test: /\.module\.s[ac]ss$/i,
                    use: [
                        require.resolve('style-loader'),
                        {
                            loader: require.resolve('css-loader'),
                            options: {
                                modules: {
                                    localIdentName: '[name]__[local]--[hash:base64:5]',
                                },
                            },
                        },
                        require.resolve('postcss-loader'),
                        require.resolve('sass-loader'),
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
    }

    return rsPackConfig
}

function configureModuleRules() {
    return [

    ]
}

function createStylesRule() {
    const loaders = getCssLoaders();
    return {
        test: /\.css$/,
        // sideEffects: options.isEnvProduction ? true : undefined,
        use: loaders,
    };
}

function getCssLoaders() {
    const loaders: RuleSetUseItem[] = [];
}