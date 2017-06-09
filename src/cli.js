#!/usr/bin/env node

import { Model } from '.'
import Table from 'cli-table'

if (process.argv.length < 4) {
  throw new TypeError("Missing parameters.");
}

const commandParam = process.argv[2];
const fileParam = process.argv[3];

const model = new Model(fileParam);

switch (commandParam) {
  case "decode":
    console.log(JSON.stringify(model.object));
    break;
  case "name":
    console.log(model.name);
    break;
  case "type":
    console.log(model.type);
    break;
  case "size":
    console.log(`${model.size} bytes`);
    break;
  case "author":
    console.log(model.author);
    break;
  case "license":
    console.log(model.license);
    break;
  case "description":
    console.log(model.description);
    break;
  case "show":
    // instantiate
    let table = new Table();
    
    table.push(
      { "Name": model.name },
      { "Type": model.type },
      { "Size": `${model.size} bytes` },
      { "Author": model.author },
      { "License": model.license },
      { "Description": model.description }
    );
    
    console.log(table.toString());
    break;
  default:
    throw new TypeError("Invalid command.");
    break;
}
