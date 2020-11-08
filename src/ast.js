import { keys, union, has } from 'lodash';

export default (firstData, secondData) => {
  const iter = (first, second) => {
    const onlyUniqueKeys = union(keys(first), keys(second));

    return onlyUniqueKeys.flatMap(((key) => {
      if (!has(first, key)) {
        return {
          key, type: 'added', value: second[key],
        };
      }
      if (!has(second, key)) {
        return {
          key, type: 'deleted', value: first[key],
        };
      }

      if (typeof first[key] === 'object' && typeof second[key] === 'object') {
        const children = iter(first[key], second[key]);
        return {
          key, type: 'hasChildren', children,
        };
      }
      if (first[key] === second[key]) {
        return {
          key, type: 'unchanged', value: first[key],
        };
      }
      return {
        key, type: 'changed', beforeValue: first[key], afterValue: second[key],
      };
    }));
  };

  const ast = iter(firstData, secondData);
  return ast;
};
