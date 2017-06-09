import { Model as ModelMessage } from './messages/Model_pb';
import path from 'path';
import fs from 'fs';

// String value describing model type isn't available, however
// you can get the all caps name of the type from the object
// ModelMessage.TypeCase (Which is { [type: String]: number })
export const typeNames = Object
  .keys(ModelMessage.TypeCase)
  .reduce(function (typeNames, name) {
    typeNames[ModelMessage.TypeCase[name]] = name; // Reverse key value pair order.
    return typeNames;
  }, {});

export class Model {
  constructor(fileName) {
    this.fileName = fileName;
    this.model = this.loadFile(fileName);
  }
  
  loadFile(fileName) {
    this.loadedFile = fs.readFileSync(fileName);
    return ModelMessage.deserializeBinary(this.loadedFile);
  }
  
  get object() {
    return this.model.toObject();
  }
  
  get metadata() {
    const description = this.model.getDescription();
    return description.getMetadata();
  }
  
  get name() {
    return path.basename(this.fileName, '.mlmodel');
  }
  
  get type() {
    const typeCase = this.model.getTypeCase();
    return typeNames[typeCase];
  }
  
  get size() {
    return this.loadedFile.byteLength;
  }
  
  get author() {
    return this.metadata.getAuthor();
  }
  
  get license() {
    return this.metadata.getLicense();
  }
  
  get description() {
    return this.metadata.getShortdescription();
  }
}
