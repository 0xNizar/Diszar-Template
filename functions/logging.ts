import chalk from 'chalk';
const log = console.log;

export class Logging {
    success(message: string) {
        log(`${chalk.green.bold('Success:')} ${message}`);
    }

    error(message: string) {
        log(`${chalk.red.bold('Error:')} ${message}`);
    }

    warning(message: string) {
        log(`${chalk.yellow.bold('Warning:')} ${message}`);
    }
}