import { isObject, mapValues } from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';


const distinguishNumsInIniParser = (content) => (
  mapValues(content, (n) => (
    isObject(n) ? distinguishNumsInIniParser(n)
      : parseInt(n, 10) || n
  ))
);


export default (fileContent, fileExtension) => {
  switch (fileExtension) {
    case '.yaml':
    case '.yml':
      return yaml.safeLoad(fileContent);
    case '.json':
      return JSON.parse(fileContent);
    case '.ini':
      return distinguishNumsInIniParser(ini.parse(fileContent));
    default:
      throw new Error(`Unknown extension: '${fileExtension}' ! Unable to parse '${fileContent}'!`);
  }
};
