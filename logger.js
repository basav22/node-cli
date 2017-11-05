const chalk = require("chalk");

const log = console.log;

const error = msg => log(chalk.red(msg));

const info = msg => log(chalk.blue(msg));

module.exports = {
  error,
  info
};
