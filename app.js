#!/usr/bin/env node

const program = require("commander");

const { prompt } = require("inquirer");

const questions = [
  {
    type: "list",
    name: "env",
    message: "Select Environment",
    choices: ["PROD", "TEST"],
    default: 1
  },
  { type: "input", name: "branch", message: "Enter Git Branch" },
  { type: "input", name: "name", message: "Enter Name" }
];

program.version("0.0.1").description("Agrostar UI deployment CLI");

program
  .command("agdeploy1")
  .alias("basav")
  .action(() => {
    prompt(questions).then(answers =>
      console.log("Env is %s and Branch is %s", answers.env, answers.branch)
    );
  });

program.parse(process.argv);
