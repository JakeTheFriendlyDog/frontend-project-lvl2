import { isObject, mapValues } from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';
import fs from 'fs';


const distinguishNumsInIniParser = (doc) => (
  mapValues(doc, (n) => (
    isObject(n) ? distinguishNumsInIniParser(n)
      : parseInt(n, 10) || n
  ))
);

const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');

export default (filePath) => {
  const fileExtension = path.extname(path.resolve(filePath));
  switch (fileExtension) {
    case '.yaml':
    case '.yml':
      return yaml.safeLoad(readFile(filePath));
    case '.json':
      return JSON.parse(readFile(filePath));
    case '.ini':
      return distinguishNumsInIniParser(ini.parse(readFile(filePath)));
    case '.txt':
      return readFile(filePath);
    default:
      throw new Error(`Unknown extension: '${fileExtension}' ! Unable to parse '${filePath}'!`);
  }
};
