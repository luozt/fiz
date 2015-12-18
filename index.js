// vi index.js
var fis = module.exports = require("fis3");

fis.require.prefixes.unshift("fiz");
fis.cli.name = "fiz";
fis.cli.info = require("./package.json");

