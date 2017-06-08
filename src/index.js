import {Model} from './messages/Model_pb';
import fs from 'fs';

export function loadFile(fileName) {
  const loadedFile = fs.readFileSync(fileName);
  return Model.deserializeBinary(loadedFile);
}

export function getDescription(model) {
  
}
