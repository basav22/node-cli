//@ts-check

const fire = require("./firebaseConfig");
const gitUtils = require("./gitutils");
const configHelper = require("./configHelper");
const logger = require("./logger");

async function storeFireData(userInfo, status) {
  const { server, branch, apiServer } = userInfo;
  const username = await gitUtils.getUserGitInfo();
  const deployTime = new Date().toLocaleString();
  const commitInfo = await gitUtils.getLatestCommit();
  const project = configHelper.getProjectName();

  saveFirebaseData(project, {
    user: username,
    date: deployTime,
    commit: commitInfo,
    server: server,
    branch: branch,
    sucess: status,
    apiServer: apiServer,
    project: project
  });
}

function saveFirebaseData(ref, value) {
  try {
    var usersRef = fire.database().ref(ref);
    usersRef.push(value);
    logger.info("Data successfully saved to Firebase");
    return 0;
  } catch (err) {
    logger.error(` ### could not save to Firebase `);
    throw err;
  }
}

module.exports = {
  storeFireData: storeFireData
};
