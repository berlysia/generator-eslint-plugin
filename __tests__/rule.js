"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-eslint-plugin:rule", () => {
  async function setup() {
    return helpers.run(path.join(__dirname, "../generators/rule")).withPrompts({
      ok: true,
      ruleId: "some-rule",
      category: "Possible Errors",
      description: "short description of the rule",
    });
  }

  it("creates files", async () => {
    await setup();
    const files = ["index.md", "index.js", "index.test.js"].map(x => path.join("some-rule", x));
    assert.file(files);
  });
});
