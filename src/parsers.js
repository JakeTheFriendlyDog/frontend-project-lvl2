import { isObject, mapValues } from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';
import fs from 'fs';


const distinguishNumsInIniParser = (content) => (
  mapValues(content, (n) => (
    isObject(n) ? distinguishNumsInIniParser(n)
      : parseInt(n, 10) || n
  ))
);

const readFile = (filepath) => fs.readFileSync(filepath, 'utf8');

export default (filepath) => {
  const fileExtension = path.extname(path.resolve(filepath));
  switch (fileExtension) {
    case '.yaml':
    case '.yml':
      return yaml.safeLoad(readFile(filepath));
    case '.json':
      return JSON.parse(readFile(filepath));
    case '.ini':
      return distinguishNumsInIniParser(ini.parse(readFile(filepath)));
    case '.txt':
      return readFile(filepath);
    default:
      throw new Error(`Unknown extension: '${fileExtension}' ! Unable to parse '${filepath}'!`);
  }
};
