#!/usr/bin/env node

// @ts-check
const program = require("commander");
const { prompt, Separator } = require("inquirer");
const chalk = require("chalk");
const gitUtils = require("./gitutils");

// const agdeployJson = require("./agdeploy.json");
const configHelper = require("./configHelper");

const logger = require("./logger");
const build = require("./build");
const deploy = require("./deploy");
const firebaseUtils =  require("./firebaseUtils");

/**
 * Global variable go here
 */
let branches = []; // Local git branches

/**
 * Init Block
 */
initialiseGit().then(init);

async function initialiseGit() {
  branches = await gitUtils.getLocalBranches();
}

function init() {
  program.version("0.0.1").description("Agrostar UI deployment CLI");

  program
    .command("agdeploy")
    .alias("deploy")
    .action(() => {
      prompt([getEnvOpts(), getLocalBranches(), getApiServerOpts()]).then(
        processAnswers
      );
    });

  program.parse(process.argv);
}

function getEnvOpts() {
  return {
    type: "list",
    name: "server",
    message: "Choose Server",
    choices: configHelper.getEnvs(),
    default: 0
  };
}

function getLocalBranches() {
  return {
    type: "list",
    name: "branch",
    message: "Choose branch",
    choices: branches,
    default: answers => (answers.server === "prod" ? "master" : 0)
  };
}

function getApiServerOpts() {
  return {
    type: "list",
    name: "apiServer",
    message: "Choose API endpoint",
    choices: configHelper.getApiServers()
  };
}

function processAnswers(answers) {
  const { server, branch, apiServer } = answers;

    gitUtils
      .checkoutBranch(branch) // checkout branch
      .then(() => firebaseUtils.storeFireData(answers))
      .catch(ex => logger.error("Aborted..."));

  // gitUtils
  //   .checkoutBranch(branch) // checkout branch
  //   .then(() => build({ apiServer })) // make build
  //   .then(() => 
  //   deploy({ server }
  //   storeFireData())
  //   .catch(ex => logger.error("Aborted..."));
}
