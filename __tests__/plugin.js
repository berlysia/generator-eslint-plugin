"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const gen = require("../generators/plugin");

describe("generator-eslint-plugin:plugin", () => {
  async function setup() {
    return helpers.run(path.join(__dirname, "../generators/plugin")).withPrompts({
      pluginId: "some-plugin",
      description: "description of some-plugin",
      authorName: "author name",
      isScoped: false,
      scopeName: "scopeName",
    });
  }

  it("creates files", async () => {
    await setup();
    const files = gen.FILES.map(name => name.replace(/^__/, ".").replace(/^_/, ""));
    assert.file(files);
  });
});
