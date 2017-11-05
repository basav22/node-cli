const gitUtils = require("./gitutils");

function init() {
  gitUtils.checkoutBranch("interactive");
}

init();
