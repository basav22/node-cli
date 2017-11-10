const firebase = require("firebase");

var config = {
  apiKey: "AIzaSyAR0XL0EGtl8V0mreihVPnDfDyx1Iut5w0",
  authDomain: "node-cli-agdeply.firebaseapp.com",
  databaseURL: "https://node-cli-agdeply.firebaseio.com",
  projectId: "node-cli-agdeply",
  storageBucket: "node-cli-agdeply.appspot.com",
  messagingSenderId: "146117748769"
};
var fire = firebase.initializeApp(config);

module.exports = fire;


