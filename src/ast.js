import { keys, union } from 'lodash';

const makeNode = (key, type, ancestry, beforeValue, parent, afterValue) => ({
  key,
  type,
  ancestry,
  beforeValue,
  parent,
  afterValue,
});


export default (firstData, secondData) => {
  const iter = (first, second, ancestry = 0, parent = null) => {
    const keysFromFirst = keys(first);
    const keysFromSecond = keys(second);
    const onlyUniqueKeys = union(keysFromFirst, keysFromSecond);

    return onlyUniqueKeys.flatMap(((key) => {
      if (keysFromFirst.includes(key) && keysFromSecond.includes(key)) {
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

      if (keysFromFirst.includes(key) && !keysFromSecond.includes(key)) {
        return makeNode(key, 'deleted', ancestry, first[key], parent);
      }
      return makeNode(key, 'changed', ancestry, second[key], parent);
    }));
  };

  const ast = iter(firstData, secondData);
  return ast;
};
