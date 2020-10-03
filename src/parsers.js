import { isObject, mapValues } from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';


const distinguishNumsInIniParser = (content) => (
  mapValues(content, (n) => (
    isObject(n) ? distinguishNumsInIniParser(n)
      : parseInt(n, 10) || n
  ))
);


export default (data, dataFormat) => {
  switch (dataFormat) {
    case '.yaml':
    case '.yml':
      return yaml.safeLoad(data);
    case '.json':
      return JSON.parse(data);
    case '.ini':
      return distinguishNumsInIniParser(ini.parse(data));
    default:
      throw new Error(`Unknown extension: '${dataFormat}' ! Unable to parse '${data}'!`);
  }
};
