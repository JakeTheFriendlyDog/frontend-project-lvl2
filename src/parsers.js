import { isObject, mapValues } from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';
import fs from 'fs';


const distinguishNumsInIniParser = (doc) => (mapValues(doc, (n) => {
  const newValue = isObject(n) ? distinguishNumsInIniParser(n) : parseInt(n, 10) || n;
  return newValue;
})
);


export default (configFile) => {
  const format = path.extname(path.resolve(configFile));
  let doc;
  switch (format) {
    case '.yaml':
    case '.yml':
      doc = yaml.safeLoad(fs.readFileSync(configFile, 'utf8'));
      break;
    case '.json':
      doc = JSON.parse(fs.readFileSync(configFile, 'utf8'));
      break;
    case '.ini':
      doc = distinguishNumsInIniParser(ini.parse(fs.readFileSync(configFile, 'utf8')));
      break;
    default:
      doc = fs.readFileSync(configFile, 'utf8');
  }
  return doc;
};
