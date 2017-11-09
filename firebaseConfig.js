const firebase = require("firebase");

async function init() {
  var config = {
    apiKey: "AIzaSyAR0XL0EGtl8V0mreihVPnDfDyx1Iut5w0",
    authDomain: "node-cli-agdeply.firebaseapp.com",
    databaseURL: "https://node-cli-agdeply.firebaseio.com",
    projectId: "node-cli-agdeply",
    storageBucket: "node-cli-agdeply.appspot.com",
    messagingSenderId: "146117748769"
  };
  var fire = await firebase.initializeApp(config);
  return fire;
}
//  console.log("**", fire)
//   return fire;
module.exports = {
  firebase: init
};
