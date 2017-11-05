// @ts-check
const execSync = require("child_process").execSync;
const logger = require("./logger");
const configHelper = require("./configHelper");

function build(config) {
  let command = "npm run %ENV%";
  try {
    const { apiServer } = config;

    const cmdKeyword = configHelper.getCmdKeyword(apiServer);
    command = command.replace("%ENV%", cmdKeyword);
    
    logger.info(`------Creating Build------- ${command}`);

    const stdout = execSync(command, { stdio: "inherit" });

  } catch (error) {
    logger.error("----ERROR while building project-----");
    logger.error(error.toString());
    throw error;
  } finally {
    logger.info("------ Done Build -----");
  }
}

module.exports =  build ;
