// @ts-check
const logger = require("./logger");
const configHelper = require("./configHelper");
const execSync = require("child_process").execSync;

/**
 * User credentials --- Remove this
 * TODO: Ask for username/password 
 */
const username = "root";
const password = "";

function deploy(config) {
  try {
    const { server } = config;

    const hostName = configHelper.getHostName(server);
    const localDir = configHelper.getLocalDeployDir();
    const remoteDir = configHelper.getRemoteDeployDir();

    const command = `scp -r ${localDir} ${username}@${hostName}:${password}${remoteDir}`
    
    logger.info(` ------ Starting deploying to server: ${hostName}  --------`);

    const stdout = execSync(command, { stdio: "inherit" });
    logger.info("-------------\n" + stdout);

    logger.info(` ------ Done deploying to server: ${hostName}  --------`);

  } catch (ex) {
    logger.error(` ---- Error while deploying to server ------ ${ex.toString()}`);
    throw ex;
  }
}

module.exports = deploy;
