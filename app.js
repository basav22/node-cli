#!/usr/bin/env node

const program = require("commander");
const git = require("simple-git");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { prompt, Separator } = require("inquirer");

const envMap = {
  TEST: "test:build",
  DEVELOP: "dev:build",
  PRODUCTION: "prod"
};

const envPrompt = [
  {
    type: "list",
    name: "selectedEnv",
    message: "Choose Environment to deploy",
    choices: [
      { name: "TEST", script: "test:build" },
      { name: "DEVELOP", script: "dev:build" },
      { name: "PRODUCTION", script: "prod" }
    ],
    validate: function(answer) {
      if (answer.length < 1) {
        return "You must choose at least one topping.";
      }
      return true;
    }
  }
];

const confirmPrompt = [
  {
    type: "confirm",
    name: "deploy",
    message: "Do you wanto deploy it to remote server?"
  }
];

// convert to promisify- 
// rename to onBranchCheckout
function checkoutBranch(branch) {
  git()
    .checkout(branch)
    .exec((err, data) => {
      if (!err) {
        console.log("checkout succesfully");
        selectEnvironment();
      } else console.log("it failed", err);
    });
}

// rename - createBuild
function selectEnvironment() {
  prompt(envPrompt).then(function(answers) {
    runBuildProcess(answers.selectedEnv);
  });
}

function runBuildProcess(selectedEnv) {
  exec("npm run " + envMap[selectedEnv]).then(({ stdout, stderr }) => {
    //after dist folder is made deploying the code
    prompt(confirmPrompt).then(answers => {
      if (answers.deploy) {
        prompt([
          {
            type: "input",
            name: "username",
            message: "Enter username"
          },
          {
            type: "input",
            name: "password",
            message: "Enter password"
          },
          {
            type: "input",
            name: "fromDeployFolder",
            message: "Enter folder to deploy from"
          },
          {
            type: "input",
            name: "toDeployFolder",
            message: "Enter the folder to deploy to"
          },
          {
            type: "input",
            name: "remoteServer",
            message: "Enter the remote server address"
          }
        ]).then(answer => {
          let scpCommand = answer.password.length
            ? `scp -r ${answer.fromDeployFolder}/ ${answer.username}:${answer.password}@${answer.remoteServer}:~/${answer.toDeployFolder}`
            : `scp -r ${answer.fromDeployFolder}/ ${answer.username}@${answer.remoteServer}:~/${answer.toDeployFolder}`;
            
          exec(scpCommand).then(
            ({ stdout, stderr }) => {
              console.log(
                stdout,
                stderr,
                "successfully deployed to remote server"
              );
            },
            error => {
              throw error;
            }
          );
        });
      } else {
        console.log("exiting cli without deployment");
        return 0;
      }
    });
  });
}

function deploy(choices) {
  prompt([
    {
      type: "list",
      name: "selectedBranch",
      message: "Choose branch to checkout to",
      choices: choices
    },
    {
      type: "confirm",
      name: "askAgain",
      message: "Want to checkout to another branch?",
      default: true
    }
  ]).then(answers => {
    if (answers.askAgain) {
      deploy();
    } else {
      // checkout to the selected branch
      //not handling stash and commit cases now (will do later)
      checkoutBranch(answers.selectedBranch);
    }
  });
}

function init() {
  git().branchLocal((err, data) => {
    if (!err) {
      var list = data.all;

      program.version("0.0.1").description("Agrostar UI deployment CLI");
      program
        .command("agdeploy")
        .alias("deploy")
        .action(() => {
          deploy(list);
        });
      program.parse(process.argv);
    }
  });
}

init();
