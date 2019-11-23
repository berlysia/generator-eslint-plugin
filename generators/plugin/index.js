"use strict";
const path = require("path");
const Generator = require("yeoman-generator");
const mkdirp = require("mkdirp");

const FILES = [
  "_index.js",
  "_package.json",
  "_README.md",
  "_renovate.json",
  "__eslintrc.js",
  "__gitignore",
  "__prettierrc",
  "__editorconfig",
];

class PluginGenerator extends Generator {
  async process() {
    const prompts = [
      {
        type: "input",
        name: "pluginId",
        message: "Check your plugin name (must be prefixed by `eslint-plugin-`)",
        default: path.basename(this.destinationRoot()),
        validate: input => typeof input === "string" && input.startsWith("eslint-plugin-"),
      },
      {
        type: "input",
        name: "description",
        message: "Please enter a brief description of this plugin",
      },
      {
        type: "input",
        name: "authorName",
        message: "What is your name?",
        default: this.user.git.name(),
      },
      {
        type: "confirm",
        name: "isScoped",
        message: "Do you want to make this plugin a scoped module?",
        default: false,
      },
      {
        when: props => props.isScoped,
        type: "input",
        name: "scopeName",
        message: "What is the name used for the scope?",
        default: props => props.authorName,
        validate: input => Boolean(input), // really?
      },
    ];

    const props = await this.prompt(prompts);
    props.pluginId = props.pluginId.replace("eslint-plugin-", "");
    props.isScoped = props.isScoped;
    props.scopeName = props.scopeName;
    const scopePart = props.isScoped ? `@${props.scopeName}/` : "";
    props.pluginFullName = `${scopePart}eslint-plugin-${props.pluginId}`;
    props.pluginLoadName = `${scopePart}${props.pluginId}`;

    mkdirp.sync("rules");
    for (const name of FILES) {
      const newName = name.replace(/^__/, ".").replace(/^_/, "");
      this.fs.copyTpl(this.templatePath(name), this.destinationPath(newName), props);
    }

    const devDeps = [
      "eslint",
      "prettier",
      "jest",
      "husky",
      "lint-staged",
      "@berlysia/eslint-config",
      "del-cli",
      "npm-run-all",
      "eslint-plugin-eslint-plugin",
    ];

    this.yarnInstall(devDeps, { dev: true });
  }
}

PluginGenerator.FILES = FILES;

module.exports = PluginGenerator;
