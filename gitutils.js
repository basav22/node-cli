/**
 * Git Utility Functions go here
 */
const bb = require("bluebird");

const git = require("simple-git")();

function checkoutBranch(branch) {
  const checkoutAsync = bb.promisify(git.checkout.bind(git, branch));

  return checkoutAsync()
    .then(data => console.log("Succeess"))
    .catch(ex => console.error("failed to check out branch %s", ex));
}

module.exports = {
  checkoutBranch: checkoutBranch
};
