import { isObject, keys } from 'lodash';

const indent = (n) => '  '.repeat(n);


const stringify = (item, depth) => {
  if (!isObject(item)) {
    return item;
  }
  const result = keys(item).map((key) => `${indent(depth + 4)}${key}: ${item[key]}`);
  return ['{', ...result, `${indent(depth + 2)}}`].join('\n');
};

export default (ast) => {
  const iter = (tree, depth) => {
    const result = tree.map((node) => {
      const {
        key,
        type,
        value,
        children,
        beforeValue,
        afterValue,
      } = node;
      switch (type) {
        case 'added':
          return `${indent(depth + 1)}+ ${key}: ${stringify(value, depth)}`;
        case 'deleted':
          return `${indent(depth + 1)}- ${key}: ${stringify(value, depth)}`;
        case 'unchanged':
          return `${indent(depth + 1)}  ${key}: ${stringify(value, depth)}`;
        case 'changed':
          return `${indent(depth + 1)}- ${key}: ${stringify(beforeValue, depth)}\n${indent(depth + 1)}+ ${key}: ${stringify(afterValue, depth)}`;
        case 'hasChildren':
          return `${indent(depth + 1)}  ${key}: ${iter(children, depth + 2)}`;
        default:
          throw new Error(`Error! Type '${type}' is unknown.`);
      }
    });
    return ['{', ...result, `${indent(depth)}}`].join('\n');
  };

  return iter(ast, 0);
};
