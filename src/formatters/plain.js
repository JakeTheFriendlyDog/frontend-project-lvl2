import { isObject } from 'lodash';

const stringifyValue = (n) => (isObject(n) ? '[complex value]' : n);

export default (ast) => {
  const iter = (coll, path) => {
    const result = coll
      .filter(({ type }) => type !== 'unchanged')
      .map(({
        key, type, beforeValue, afterValue, children, value,
      }) => {
        const fullPath = path ? [...path, key].join('.') : key;
        switch (type) {
          case 'added':
            return `Property '${fullPath}' was added with value: '${stringifyValue(value)}'`;
          case 'deleted':
            return `Property '${fullPath}' was removed`;
          case 'changed':
            return `Property '${fullPath}' was updated. From '${stringifyValue(beforeValue)}' to '${stringifyValue(afterValue)}'`;
          case 'hasChildren':
            return iter(children, [...path, key]);
          default:
            throw new Error(`Error! Type '${type}' is unknown.`);
        }
      });
    return result.join('\n');
  };

  return iter(ast, []);
};
