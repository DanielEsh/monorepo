export interface AppBuilderConfig {
    devServer: {
        port: number;
    }
}

export function defineConfig(config: AppBuilderConfig) {
    return config;
}