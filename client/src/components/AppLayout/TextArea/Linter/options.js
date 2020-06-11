const options = [
  {
    name: "bitwise",
    default: true,
    tooltip: "true: Prohibit bitwise operators (&, |, ^, etc.)"
  },
  {
    name: "camelcase",
    default: false,
    tooltip: "true: Identifiers must be in camelCase"
  },
  {
    name: "curly",
    default: true,
    tooltip: "true: Require {} for every new block or scope"
  },
  {
    name: "eqeqeq",
    default: true,
    tooltip: "true: Require triple equals (===) for comparison"
  },
  {
    name: "forin",
    default: true,
    tooltip: "true: Require filtering for..in loops with obj.hasOwnProperty()"
  },
  {
    name: "freeze",
    default: true,
    tooltip:
      "true: prohibits overwriting prototypes of native objects such as Array, Date etc."
  },
  {
    name: "immed",
    default: false,
    tooltip:
      "true: Require immediate invocations to be wrapped in parens e.g. '(function () { } ());'"
  },
  {
    name: "latedef",
    default: false,
    tooltip: "true: Require variables/functions to be defined before being used"
  },
  {
    name: "newcap",
    default: false,
    tooltip:
      "true: Require capitalization of all constructor functions e.g. 'new F()'"
  },
  {
    name: "noarg",
    default: true,
    tooltip: "true: Prohibit use of 'arguments.caller' and 'arguments.callee'"
  },
  {
    name: "noempty",
    default: true,
    tooltip: "true: Prohibit use of empty blocks"
  },
  {
    name: "nonbsp",
    default: true,
    tooltip: 'true: Prohibit "non-breaking whitespace" characters.'
  },
  {
    name: "nonew",
    default: false,
    tooltip:
      "true: Prohibit use of constructors for side-effects (without assignment)"
  },
  {
    name: "plusplus",
    default: false,
    tooltip: "true: Prohibit use of '++' and '--'"
  },
  {
    name: "undef",
    default: true,
    tooltip:
      "true: Require all non-global variables to be declared (prevents global leaks)"
  },
  {
    name: "strict",
    default: true,
    tooltip: "true: Requires all functions run in ES5 Strict Mode"
  },
  {
    name: "maxparams",
    default: false,
    tooltip: "{int} Max number of formal params allowed per function"
  },
  {
    name: "maxdepth",
    default: false,
    tooltip: "{int} Max depth of nested blocks (within functions)"
  },
  {
    name: "maxstatements",
    default: false,
    tooltip: "{int} Max number statements per function"
  },
  {
    name: "maxcomplexity",
    default: false,
    tooltip: "{int} Max cyclomatic complexity per function"
  },
  {
    name: "maxlen",
    default: false,
    tooltip: "{int} Max number of characters per line"
  },
  {
    name: "varstmt",
    default: false,
    tooltip:
      "true: Disallow any var statements. Only 'let' and 'const' are allowed."
  },
  {
    name: "asi",
    default: false,
    tooltip: "true: Tolerate Automatic Semicolon Insertion (no semicolons)"
  },
  {
    name: "boss",
    default: false,
    tooltip: "true: Tolerate assignments where comparisons would be expected"
  },
  {
    name: "debug",
    default: false,
    tooltip: "true: Allow debugger statements e.g. browser breakpoints."
  },
  {
    name: "eqnull",
    default: false,
    tooltip: "true: Tolerate use of '== null'"
  },
  {
    name: "moz",
    default: false,
    tooltip:
      "true: Allow Mozilla specific syntax (extends and overrides esnext features)"
  },
  {
    name: "evil",
    default: false,
    tooltip: "true: Tolerate use of 'eval' and 'new Function()'"
  },
  {
    name: "expr",
    default: false,
    tooltip: "true: Tolerate 'ExpressionStatement' as Programs"
  },
  {
    name: "funcscope",
    default: false,
    tooltip: "true: Tolerate defining variables inside control statements"
  },
  {
    name: "globalstrict",
    default: false,
    tooltip: "true: Allow global \"use strict\" (also enables 'strict')"
  },
  {
    name: "iterator",
    default: false,
    tooltip: "true: Tolerate using the '__iterator__' property"
  },
  {
    name: "lastsemic",
    default: false,
    tooltip:
      "true: Tolerate omitting a semicolon for the last statement of a 1-line block"
  },
  {
    name: "laxbreak",
    default: false,
    tooltip: "true: Tolerate possibly unsafe line breakings"
  },
  {
    name: "laxcomma",
    default: false,
    tooltip: "true: Tolerate comma-first style coding"
  },
  {
    name: "loopfunc",
    default: false,
    tooltip: "true: Tolerate functions being defined in loops"
  },
  {
    name: "multistr",
    default: false,
    tooltip: "true: Tolerate multi-line strings"
  },
  {
    name: "noyield",
    default: false,
    tooltip:
      "true: Tolerate generator functions with no yield statement in them."
  },
  {
    name: "notypeof",
    default: false,
    tooltip: "true: Tolerate invalid typeof operator values"
  },
  {
    name: "proto",
    default: false,
    tooltip: "true: Tolerate using the '__proto__' property"
  },
  {
    name: "scripturl",
    default: false,
    tooltip: "true: Tolerate script-targeted URLs"
  },
  {
    name: "shadow",
    default: false,
    tooltip:
      "true: Allows re-define variables later in code e.g. 'var x=1; x=2;'"
  },
  {
    name: "sub",
    default: false,
    tooltip:
      "true: Tolerate using '[]' notation when it can still be expressed in dot notation"
  },
  {
    name: "supernew",
    default: false,
    tooltip: "true: Tolerate 'new function () { ... };' and 'new Object;'"
  },
  {
    name: "validthis",
    default: false,
    tooltip: "true: Tolerate using this in a non-constructor function"
  },
  {
    name: "nonstandard",
    default: false,
    tooltip: "Widely adopted globals (escape, unescape, etc)"
  },
  {
    name: "typed",
    default: false,
    tooltip: "Globals for typed array constructions"
  },
  { name: "worker", default: false, tooltip: "Web Workers" }
];

export default options;
