import {colors} from './colors'

export interface BaseLogger {
    message: (msg: string) => void;
    success: (msg: string) => void;
    error: (msg: string) => void;
}

export class Logger implements BaseLogger {
    colors = colors;

    print = (message: string) => {
        process.stdout.write(message);
    };

    clearLine = () => {
        if (process.stdout.isTTY) {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
        }
    };

    message = (...args: string[]) => {
        this.print(this.colors.green(args.join(' ' + '/n')));
    };

    success = (...args: string[]) => {
        this.print(this.colors.green(...args));
    };

    error = (...args: string[]) => {
        this.print(this.colors.red(...args));
    };

    logError = (errorMeta: string, error?: unknown) => {
        this.error(errorMeta);
        if (error && typeof error === 'object') {
            if ('name' in error && typeof error.name === 'string') {
                this.error(error.name);
            }
            if ('message' in error && typeof error.message === 'string') {
                this.error(error.message);
            }
            if ('stack' in error && typeof error.stack === 'string') {
                this.error(error.stack);
            }
        }
    };

    panic = (errorMeta: string, error?: unknown) => {
        this.logError(errorMeta, error);
        process.exit(1);
    };

    verbose = (...args: string[]) => {
        this.print(this.colors.dim(...args));
    };
}

export const logger = new Logger();