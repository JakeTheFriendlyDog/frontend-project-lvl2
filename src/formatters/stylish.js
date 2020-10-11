import { isObject, identity } from 'lodash';

const indentStep = 2;
const indent = (n) => '  '.repeat(n * indentStep);

const getSymbol = (type) => {
  switch (type) {
    case 'unchanged':
      return '    ';
    case 'changed':
      return '  + ';
    case 'added':
      return '  + ';
    case 'deleted':
      return '  - ';
    default:
      throw new Error(`Unknown '${type}'! Unable to format output as stylish!`);
  }
};

const actions = [
  {
    check: (n) => Array.isArray(n),
    process: (n, f, { depth }) => `{${n.map(f).join('')}\n${indent(depth + 1)}}`,
  },
  {
    check: (n) => isObject(n),
    process: (n, f, { depth }) => {
      const [key, value] = Object.entries(n).flat();
      return `{\n${indent(depth + 2)}${key}: ${value}\n${indent(depth + 1)}}`;
    },
  },
  {
    check: (n) => !isObject(n),
    process: identity,
  },
];

export default (ast) => {
  const makeNode = (node) => {
    const {
      key,
      type,
      depth,
      beforeValue,
    } = node;
    const { process } = actions.find(({ check }) => check(beforeValue));
    return `\n${indent(depth)}${getSymbol(type)}${key}: ${process(beforeValue, makeNode, node)}`;
  };
  return `{${ast.map(makeNode).join('')}\n}`;
};
