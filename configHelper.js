// @ts-check
const path = require("path");
const agdeployJson = require(path.join(path.resolve(), "agdeploy.json"));
const logger = require("./logger");

function getEnvs() {
  return agdeployJson.config.envs;
}

function getApiServers() {
  return agdeployJson.config.apiServers;
}

function getCmdKeyword(apiServer) {
  try {
    return getApiServers().filter(s => s.value === apiServer)[0].commandKeyword;
  } catch (ex) {
    logger.error(`error while getting cmdKeyword for apiServer ${apiServer}`);
    throw ex;
  }
}

function getHostName(env) {
  try {
    return getEnvs().filter(s => s.value === env)[0].host;
  } catch (ex) {
    logger.error(`error while getting hostname for Env - ${env}`);
    throw ex;
  }
}

function getLocalDeployDir() {
  try {
    return agdeployJson.config.localDeployDir || "dist";
  } catch (ex) {
    logger.error(`error while getting Local deploy directory`);
    return "dist";
  }
}

function getRemoteDeployDir() {
  try {
    return agdeployJson.config.remoteDeployDir;
  } catch (ex) {
    logger.error(`error while getting Remote deploy directory`);
    throw ex;
  }
}

module.exports = {
  getEnvs,
  getApiServers,
  getCmdKeyword,
  getHostName,
  getLocalDeployDir,
  getRemoteDeployDir
};
