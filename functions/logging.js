import chalk from 'chalk';
const log = console.log;

export class Logging {
    success(message) {
        log(`${chalk.green.bold('Success:')} ${message}`);
    }

    error(message) {
        log(`${chalk.red.bold('Error:')} ${message}`);
    }

    warning(message) {
        log(`${chalk.yellow.bold('Warning:')} ${message}`);
    }
}