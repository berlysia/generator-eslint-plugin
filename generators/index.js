"use strict";
const Generator = require("yeoman-generator");

const HELPER = {
  rule: require.resolve("./rule"),
  plugin: require.resolve("./plugin"),
};

module.exports = class extends Generator {
  async generate() {
    const prompts = [
      {
        type: "list",
        name: "outputType",
        message: "Do you want to generate a rule or a plugin?",
        choices: ["plugin", "rule"],
        default: "plugin",
      },
    ];

    const props = await this.prompt(prompts);

    return this.composeWith(HELPER[props.outputType]);
  }
};
