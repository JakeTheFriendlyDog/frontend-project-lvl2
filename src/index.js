import { keys, union } from 'lodash';
import parse from './parsers.js';
import format from './formatters/index.js';


const makeNode = (key, type, ancestry, value, parent, oldValue) => ({
  key,
  type,
  ancestry,
  value,
  parent,
  oldValue,
});


const genDiff = (firstFile, secondFile) => {
  const iter = (first, second, ancestry = 1, parent = null) => {
    const keysFromFirstObj = keys(first);
    const keysFromSecondObj = keys(second);
    const onlyUniqueKeys = union(keysFromFirstObj, keysFromSecondObj);

    return onlyUniqueKeys.flatMap(((key) => {
      if (keysFromFirstObj.includes(key) && keysFromSecondObj.includes(key)) {
        if (typeof first[key] === 'object' && typeof second[key] === 'object') {
          const children = iter(first[key], second[key], ancestry + 1, key);
          return makeNode(key, 'unchanged', ancestry, children, parent);
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

  const ast = iter(firstFile, secondFile);
  return ast;
};


export default (pathToFirstFile, pathToSecondFile, chosenFormat) => {
  const firstFileParsed = parse(pathToFirstFile);
  const secondFileParsed = parse(pathToSecondFile);
  const ast = genDiff(firstFileParsed, secondFileParsed);
  const formattedDifference = format(ast, chosenFormat);
  return formattedDifference;
};
