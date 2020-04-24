import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';
import fs from 'fs';


export default (configFile) => {
  const format = path.extname(path.resolve(configFile));
  let doc;
  if (format === '.yaml' || format === '.yml') {
    doc = yaml.safeLoad(fs.readFileSync(configFile, 'utf8'));
  }
  if (format === '.json') {
    doc = JSON.parse(fs.readFileSync(configFile, 'utf8'));
  }
  if (format === '.ini') {
    doc = ini.parse(fs.readFileSync(configFile, 'utf8'));
  }
  if (format === '.txt') {
    doc = fs.readFileSync(configFile, 'utf8');
  }
  return doc;
};
