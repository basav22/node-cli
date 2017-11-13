const firebase = require("firebase");

var config = {
  apiKey: "AIzaSyAzhM_QXTygDNgil5hIkABK18AhBCvwXi8",
  authDomain: "deploy-cli.firebaseapp.com",
  databaseURL: "https://deploy-cli.firebaseio.com",
  projectId: "deploy-cli",
  storageBucket: "deploy-cli.appspot.com",
  messagingSenderId: "1091582103199"
};
var fire = firebase.initializeApp(config);

module.exports = fire;