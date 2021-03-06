"use strict";

/* @see https://eslint.org/docs/developer-guide/working-with-rules */
/** @type {import("eslint").Rule.RuleModule} */
module.exports = {
  meta: {
    docs: {
      description: "<%= description %>",
      category: "<%= category %>",
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"
    // schema: [],
  },

  create(_context) {
    return {
      //
    };
  },
};
