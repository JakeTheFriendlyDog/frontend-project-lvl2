import { keys, union } from 'lodash';
import parse from './parsers.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import toJSON from './formatters/toJSON.js';


const makeNode = (key, type, ancestry, value, parent, oldValue) => ({
  key,
  type,
  ancestry,
  value,
  parent,
  oldValue,
});


const format = (ast, type) => {
  switch (type) {
    case 'stylish':
      return stylish(ast);
    case 'plain':
      return plain(ast);
    case 'json':
    case 'JSON':
      return toJSON(ast);
    default:
      throw new Error(`Unknown formatter: '${type}' ! Unable to format!`);
  }
};


export default (chosenFormat, ...configs) => {
  const parsedConfigs = configs.map(parse);

  const iter = (first, second, ancestry = 1, parent = null) => {
    const keysFromFirstObj = keys(first);
    const keysFromSecondObj = keys(second);
    const onlyUniqueKeys = union(keysFromFirstObj, keysFromSecondObj);

    return onlyUniqueKeys.flatMap(((key) => {
      if (keysFromFirstObj.includes(key) && keysFromSecondObj.includes(key)) {
        if (typeof first[key] === 'object' && typeof second[key] === 'object') {
          return makeNode(key, 'unchanged', ancestry, iter(first[key], second[key], ancestry + 1, key), parent);
        }
        if (first[key] === second[key]) {
          return makeNode(key, 'unchanged', ancestry, first[key], parent);
        }
        return [makeNode(key, 'deleted', ancestry, first[key], parent),
          makeNode(key, 'changed', ancestry, second[key], parent, first[key])];
      }

      if (keysFromFirstObj.includes(key) && !keysFromSecondObj.includes(key)) {
        return makeNode(key, 'deleted', ancestry, first[key], parent);
      }
      return makeNode(key, 'changed', ancestry, second[key], parent);
    }));
  };

  const ast = iter(...parsedConfigs);
  const formattedResult = format(ast, chosenFormat);
  return formattedResult;
};
