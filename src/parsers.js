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


export default (filePath) => {
  const fileExtension = path.extname(path.resolve(filePath));
  switch (fileExtension) {
    case '.yaml':
    case '.yml':
      return yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
    case '.json':
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    case '.ini':
      return distinguishNumsInIniParser(ini.parse(fs.readFileSync(filePath, 'utf8')));
    case '.txt':
      return fs.readFileSync(filePath, 'utf8');
    default:
      throw new Error(`Unknown extension: '${fileExtension}' ! Unable to parse '${filePath}'!`);
  }
};
