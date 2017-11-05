#!/usr/bin/env node

// @ts-check
const program = require("commander");
const { prompt, Separator } = require("inquirer");
const chalk = require("chalk");
const gitUtils = require("./gitutils");

const log = console.log;
/**
 * Global variable go here
 */
let branches = []; // Local git branches

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
    choices: [
      { name: "Production", value: "prod" },
      { name: "Staging", value: "staging" }
    ],
    default: 1
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
    choices: ["staging", "production"]
  };
}

function processAnswers(answers) {
  log(chalk.red(answers.server));
}
