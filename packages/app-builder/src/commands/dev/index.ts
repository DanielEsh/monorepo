import { CliArgs } from '../../create-cli';
import {logger} from "../../common/logger";
import chalk from 'chalk';

export default function dev(args: CliArgs) {
    console.log(chalk.bgMagenta('\n running command: dev (test watch)'));
    console.log(chalk.bgHex('#184ea1')('Белый текст на фоне #184ea1'));
    console.log('Command arguments:', args);
}