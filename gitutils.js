/**
 * Git Utility Functions go here
 */
const bb = require("bluebird");

const git = require("simple-git")();

function checkoutBranch(branch) {
  const exec = bb.promisify(git.checkout(branch).exec);

  return exec()
    .then(data => console.log("Succeess"))
    .catch(ex => console.error("failed to check out branch %s", branch));
}

module.exports = {
  checkoutBranch: checkoutBranch
};
