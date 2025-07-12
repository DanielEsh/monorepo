import {existsSync, readFileSync} from "node:fs";
import {join} from 'node:path'

function parseEnv(content) {
    const env = {};
    const lines = content.split(/\r?\n/);
    lines.forEach((line) => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
            const key = match[1];
            let value = match[2] || '';
            // Удаление обрамляющих кавычек
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }
            // Замена \n на реальные переводы строк
            value = value.replace(/\\n/g, '\n');
            if (!(key in process.env)) {
                process.env[key] = value;
            }
            env[key] = value;
        }
    });
    return env;
}

export function loadEnv(mode = '') {
    const envDir = process.cwd();
    const baseFiles = ['.env', '.env.local'];
    const modeFiles = mode ? [`.env.${mode}`, `.env.${mode}.local`] : [];

    const envFiles = [...baseFiles, ...modeFiles];

    const result = {};

    console.log('ENV DIR', envDir);

    envFiles.forEach((file) => {
        const filePath = join(envDir, file);
        if (existsSync(filePath)) {
            const content = readFileSync(filePath, 'utf-8');
            const parsed = parseEnv(content);
            Object.assign(result, parsed);
        }
    });

    console.log('RESULT', result);

    return result;
}