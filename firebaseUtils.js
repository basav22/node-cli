const firebaseConfig = require("./firebaseConfig");

(function storeFireData() {
  const fire = firebaseConfig.firebase();
  fire.then(function(firebaseObj) {
    console.log("$$", firebaseObj);

    var usersRef = firebaseObj.database().ref("users/");
    usersRef.set({
      John: {
        user: "john",
        date: "11/12/2017",
        commit: "dummy commit",
        server: "agroextest",
        branch: "interactive",
        status: "SUCCESS",
        apiServer: "some server"
      },
      Amanda: {
        user: "amanda",
        date: "11/12/2017",
        commit: "dummy commit",
        server: "agroextest",
        branch: "interactive",
        status: "SUCCESS",
        apiServer: "some server"
      }
    });

    return 0;
  });
})();
