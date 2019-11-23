"use strict";
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const Generator = require("yeoman-generator");

function estimateRulesDir(dstRoot) {
  const basename = path.basename(dstRoot);
  const joined = path.join(dstRoot, "rules");
  if (basename.startsWith("eslint-plugin-")) return joined;
  if (fs.existsSync(joined)) return joined;
  return dstRoot;
}

module.exports = class extends Generator {
  async generate() {
    const rulesDir = estimateRulesDir(this.contextRoot);

    const { ok } = await this.prompt({
      type: "confirm",
      name: "ok",
      message: `Is this your rules directory?: ${rulesDir}`,
      default: false,
    });
    if (!ok) return;

    const prompts = [
      {
        type: "input",
        name: "ruleId",
        message: "What is the rule ID?",
        validate: input => Boolean(input), // FIXME
      },
      {
        type: "list",
        name: "category",
        message: "What category of the rule?",
        choices: ["Possible Errors", "Best Practices", "Refactoring", "Other (input...)"],
      },
      {
        when: ({ category }) => category === "Other (input...)",
        type: "input",
        name: "category",
        message: "What category of the rule?",
        validate: input => Boolean(input),
      },
      {
        type: "input",
        name: "description",
        message: "Please enter a brief description of this plugin",
      },
    ];

    const props = await this.prompt(prompts);

    const files = ["index.md", "index.js", "index.test.js"];

    const ruleDir = path.join(rulesDir, props.ruleId);
    mkdirp.sync(ruleDir);
    for (const file of files) {
      this.fs.copyTpl(this.templatePath(file), path.join(ruleDir, file), props);
    }
  }
};
