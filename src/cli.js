#!/usr/bin/env node

import * as utilities from '.'

if (!(process.argv.length >= 4)) {
  throw new TypeError("Missing parameters.");
}

const commandParam = process.argv[2];
const fileParam = process.argv[3];

const model = utilities.loadFile(fileParam);

switch (commandParam) {
  case "decode":
    console.log(JSON.stringify(model));
    break;
  case "license":
    break;
  default:
    throw new TypeError("Invalid command.");
    break;
}
