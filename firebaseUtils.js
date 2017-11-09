//@ts-check

const firebaseConfig = require("./firebaseConfig");
const gitUtils = require("./gitutils");

async function storeFireData(userInfo, status) {
  const { server, branch, apiServer } = userInfo;
  const username = await gitUtils.getUserGitInfo();
  const deployTime = new Date().toLocaleString();
  const commitInfo = await gitUtils.getLatestCommit();
  var userObj = {
    user: username,
    date: deployTime,
    commit: commitInfo,
    server: server,
    branch: branch,
    status: status,
    apiServer: apiServer
  };
  saveFirebaseData("users", userObj);
}

function saveFirebaseData(key, value) {
  const fire = firebaseConfig.firebase();
  return fire.then(function(firebaseObj) {
    try {
      var usersRef = firebaseObj.database().ref(key);
      usersRef.push(value);
      console.log("Data successfully saved to Firebase");
    } catch (err) {
      console.error(` ### could not save to Firebase `);
      throw err;
    }
  });
}

module.exports = {
  storeFireData: storeFireData
};
