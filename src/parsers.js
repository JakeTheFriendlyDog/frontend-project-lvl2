import { isObject, mapValues } from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';
import fs from 'fs';


const distinguishNumsInIniParser = (doc) => (mapValues(doc, (n) => {
  const newValue = isObject(n) ? distinguishNumsInIniParser(n) : parseInt(n, 10) || n;
  return newValue;
}));


export default (configFile) => {
  const extension = path.extname(path.resolve(configFile));
  switch (extension) {
    case '.yaml':
    case '.yml':
      return yaml.safeLoad(fs.readFileSync(configFile, 'utf8'));
    case '.json':
      return JSON.parse(fs.readFileSync(configFile, 'utf8'));
    case '.ini':
      return distinguishNumsInIniParser(ini.parse(fs.readFileSync(configFile, 'utf8')));
    default:
      throw new Error('Unknown extension! Unable to parse!');
  }
};
