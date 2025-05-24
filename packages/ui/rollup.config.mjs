import { defineConfig } from 'rollup';
import path from "node:path";
import { getEntries } from './get-entries.mjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs    from '@rollup/plugin-commonjs';
import typescript  from '@rollup/plugin-typescript';
import postcss     from 'rollup-plugin-postcss';

export default defineConfig([
    // ESM-бандл
    {
        input: getEntries(),
        external: ['react', 'react-dom'],
        plugins: [
            nodeResolve({ extensions: ['.js','.ts','.tsx'] }), // ⮕ ищет .tsx-файлы :contentReference[oaicite:3]{index=3}
            commonjs(),                                        // ⮕ конвертирует CJS в ESM
            typescript({ tsconfig: './tsconfig.json' }),       // ⮕ обрабатывает .ts/.tsx :contentReference[oaicite:4]{index=4}
            postcss({ modules: true, extract: true })          // ⮕ CSS-Modules в отдельные файлы
        ],
        output: {
            dir: path.resolve(process.cwd(), 'dist/esm'),
            format: 'esm',
            sourcemap: false,
            preserveModules: true,        // ⮕ сохраняет папки pkg/index.js :contentReference[oaicite:5]{index=5}
            preserveModulesRoot: 'src',   // ⮕ обрезает до src, чтобы dist/esm/button/index.js
            exports: 'named',
        }
    },

    // CJS-бандл
    {
        input: getEntries(),
        external: ['react', 'react-dom'],
        plugins: [
            nodeResolve({ extensions: ['.js','.ts','.tsx'] }),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
            postcss({ modules: true, extract: true })
        ],
        output: {
            dir: path.resolve(process.cwd(), 'dist/cjs'),
            format: 'cjs',
            sourcemap: false,
            preserveModules: true,
            preserveModulesRoot: 'src',
            exports: 'named',
        }
    }
]);