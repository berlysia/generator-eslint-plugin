"use strict";

/* @see https://eslint.org/docs/developer-guide/nodejs-api#ruletester */

const { RuleTester } = require("eslint");
const rule = require("./");

const ruleTester = new RuleTester();

ruleTester.run("<%= ruleId %>", rule, {
  valid: [
    {
      code: "var foo = true",
    },
  ],

  invalid: [],
});
