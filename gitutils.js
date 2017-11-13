/**
 * Git Utility Functions go here
 */
const bb = require("bluebird");
const logger = require("./logger");
const execSync = require("child_process").execSync;
const git = require("simple-git")();

function checkoutBranch(branch) {
  const checkoutAsync = bb.promisify(git.checkout.bind(git, branch));

  return checkoutAsync()
    .then(data => logger.info(" ----- checkout Succeess ------"))
    .catch(ex => {
      logger.error(`failed to check out branch - ${branch}`);
      throw ex;
    });
}

function getLocalBranches() {
  const branchLocalAsync = bb.promisify(git.branchLocal.bind(git));
  return branchLocalAsync()
    .then(data => data.all)
    .catch(ex => {
      logger.error(`failed to get local branches..`);
      throw ex;
    });
}

async function getUserGitInfo() {
  const username = execSync("git config user.name").toString().replace(/\n/g, "");
  return  username;
}

function getLatestCommit() {
  const gitLogs = bb.promisify(git.log.bind(git));
  return gitLogs()
    .then(data => {
      return data["latest"];
    })
    .catch(ex => {
      logger.error(`failed to fetch logs`);
      throw ex;
    });
}

async function init() {
  localBranches = await getLocalBranches();
  return localBranches;
}

module.exports = {
  checkoutBranch: checkoutBranch,
  getLocalBranches: init,
  getUserGitInfo: getUserGitInfo,
  getLatestCommit: getLatestCommit
};
