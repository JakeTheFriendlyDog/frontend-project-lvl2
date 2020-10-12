import { keys, union, has } from 'lodash';

export default (firstData, secondData) => {
  const iter = (first, second, depth = 0) => {
    const onlyUniqueKeys = union(keys(first), keys(second));

    return onlyUniqueKeys.flatMap(((key) => {
      if (!has(first, key)) {
        return {
          key, type: 'added', depth, value: second[key],
        };
      }
      if (!has(second, key)) {
        return {
          key, type: 'deleted', depth, value: first[key],
        };
      }

      if (typeof first[key] === 'object' && typeof second[key] === 'object') {
        const children = iter(first[key], second[key], depth + 1);
        return {
          key, type: 'hasChildren', depth, children,
        };
      }
      if (first[key] === second[key]) {
        return {
          key, type: 'unchanged', depth, value: first[key],
        };
      }
      return {
        key, type: 'changed', depth, beforeValue: first[key], afterValue: second[key],
      };
    }));
  };

  const ast = iter(firstData, secondData);
  return ast;
};
