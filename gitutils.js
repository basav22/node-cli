/**
 * Git Utility Functions go here
 */
const bb = require("bluebird");

const git = require("simple-git")();

function checkoutBranch(branch) {
  const checkoutAsync = bb.promisify(git.checkout.bind(git, branch));

  return checkoutAsync()
    .then(data => console.log("checkout Succeess."))
    .catch(ex => console.error("failed to check out branch %s", ex));
}

function getLocalBranches() {
  const branchLocalAsync = bb.promisify(git.branchLocal.bind(git));
  return branchLocalAsync().then(data => data.all);
}

async function init() {
  localBranches = await getLocalBranches();
  return localBranches;
}


module.exports = {
  checkoutBranch: checkoutBranch,
  getLocalBranches: init
};
