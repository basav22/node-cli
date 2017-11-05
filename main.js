const gitUtils = require("./gitutils");

function init() {
  gitUtils.checkoutBranch("master");
}

init();
