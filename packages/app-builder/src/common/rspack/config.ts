import {Configuration, ProgressPlugin, HtmlRspackPlugin, CssExtractRspackPlugin, RuleSetUseItem} from '@rspack/core';
import type {BuildMode} from "../types";
import * as path from 'node:path';
import {createProgressPlugin} from "./progress-plugin";
import {logger} from '../logger'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

type ClientFactoryOptions = {
    buildMode: BuildMode;
    // config: NormalizedClientConfig;
    // configPath?: string;
};

export function rspackConfigFactory(options: ClientFactoryOptions): Configuration {

    const isProduction = options.buildMode === "production";
    const isDevelopment = options.buildMode === "development";

    const cssExtractLoader = {
        loader: CssExtractRspackPlugin.loader,
        options: { publicPath: '/build/' },
    };

    const getStylesLoader = () => {
        if (isProduction) return cssExtractLoader
        return require.resolve('style-loader')
    }

    const plugins = {
        ProgressPlugin: createProgressPlugin(),
    }

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
                        getStylesLoader(),
                        require.resolve('css-loader'),
                        require.resolve('postcss-loader'),
                    ],
                },
                // CSS Modules
                {
                    test: /\.module\.css$/i,
                    use: [
                        getStylesLoader(),
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
                        getStylesLoader(),
                        require.resolve('css-loader'),
                        require.resolve('postcss-loader'),
                        require.resolve('less-loader'),
                    ],
                },
                // // LESS Modules
                {
                    test: /\.module\.less$/i,
                    use: [
                        getStylesLoader(),
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
                        getStylesLoader(),
                        require.resolve('css-loader'),
                        require.resolve('postcss-loader'),
                        require.resolve('sass-loader'),
                    ],
                },
                // // SASS/SCSS Modules
                {
                    test: /\.module\.s[ac]ss$/i,
                    use: [
                        getStylesLoader(),
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
        plugins: [
            new plugins.ProgressPlugin({
                logger,
            }),
            new CssExtractRspackPlugin({
                filename: isProduction ? '[name].[contenthash].css' : '[name].css',
                chunkFilename: isProduction ? '[id].[contenthash].css' : '[id].css',
            }),
            new HtmlRspackPlugin({
                template: path.resolve(process.cwd(), 'public/index.html'),
                inject: 'body',
                minify: isProduction,
            })
        ],
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