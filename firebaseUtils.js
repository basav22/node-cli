const firebaseConfig = require("./firebaseConfig");
const gitUtils = require("./gitutils");

async function storeFireData(userInfo) {
  const { server, branch, apiServer } = userInfo;
  const { username, deployTime } = await gitUtils.getUserGitInfo();
  const fire = firebaseConfig.firebase();
  fire.then(function(firebaseObj) {

    var usersRef = firebaseObj.database().ref("users/");
    usersRef.set({
      [username]: {
        user: username,
        date: deployTime,
        commit: "dummy commit",
        server: server,
        branch: branch,
        status: "SUCCESS",
        apiServer: apiServer
      }
    });

    console.log("Deployement Info successfully saved")
    return 0;
  });
}

module.exports = {
  storeFireData: storeFireData
};
