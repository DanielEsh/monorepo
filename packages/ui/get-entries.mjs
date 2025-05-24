import { sync } from 'glob';
import path from 'path';

export function getEntries() {
    // найдёт все index.tsx в подпапках src/ внутри каждого пакета
    const files = sync('core/*/src/index.@(ts|tsx)', { cwd: process.cwd() });
    return files.map(file => path.resolve(process.cwd(), file));
}