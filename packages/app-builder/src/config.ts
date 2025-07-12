import { cosmiconfig } from 'cosmiconfig'
import { TypeScriptLoader } from 'cosmiconfig-typescript-loader'

const moduleName = 'app-builder';

const explorer = cosmiconfig('app-build', {
    cache: false,
    stopDir: process.cwd(),
    searchPlaces: [
        'package.json',
        `${moduleName}.config.js`,
        `${moduleName}.config.ts`,
        `${moduleName}.config.cjs`,
    ],
    loaders: {
        '.js': TypeScriptLoader(),
        '.cjs': TypeScriptLoader(),
        '.ts': TypeScriptLoader(),
    }
})

const result = await explorer.search()

if (!result) {
    throw new Error('Конфигурация не найдена!')
}

console.log('Загруженная конфигурация:', result.config)