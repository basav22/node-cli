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
  return branchLocalAsync().then(data => data.all);
}

function getUserGitInfo() {
    const username = execSync("git config user.name", { stdio: "inherit" });
    const deployTime = execSync('date "+%d/%m/%y %H:%M:%S"',{ stdio: "inherit" });
    return {username,deployTime};
}

async function init() {
  localBranches = await getLocalBranches();
  return localBranches;
}

module.exports = {
  checkoutBranch: checkoutBranch,
  getLocalBranches: init
};
