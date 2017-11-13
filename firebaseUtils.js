//@ts-check

const fire = require("./firebaseConfig");
const gitUtils = require("./gitutils");
const configHelper = require("./configHelper");
const logger = require("./logger");

/**
 * Prepare JSON to store in DB.
 * @param {object} answers 
 * @param {object} params 
 */
async function storeFireData(answers, params) {
  const { server, branch, apiServer } = answers;

  const user = await gitUtils.getUserGitInfo();
  const date = new Date().toLocaleString();
  const lastCommit = await gitUtils.getLatestCommit();
  const project = configHelper.getProjectName();

  saveToDB(project, Object.assign({},{
    user,
    date,
    lastCommit,
    server,
    branch,
    apiServer,
    
  }, params))
}

function saveToDB(ref, data) {
  return fire
    .database()
    .ref(ref)
    .push(data)
    .then(() => {
      logger.info("Data successfully saved to Firebase");
      fire.delete();
    })
    .catch(() => logger.error(` ### could not save to Firebase `));
}

module.exports = {
  storeFireData: storeFireData,
};
