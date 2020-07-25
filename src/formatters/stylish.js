import { isObject, identity } from 'lodash';

const indentStep = 2;
const indent = (n) => '  '.repeat(n * indentStep);

const getSymbol = (type) => {
  switch (type) {
    case 'unchanged':
      return '  ';
    case 'changed':
      return '+ ';
    case 'deleted':
      return '- ';
    default:
      throw new Error(`Unknown '${type}'! Unable to format output as stylish!`);
  }
};

const actions = [
  {
    check: (n) => Array.isArray(n),
    process: (n, f, { ancestry }) => `{${indent(ancestry)}${n.map(f).join('')}\n${indent(ancestry)}}`,
  },
  {
    check: (n) => isObject(n),
    process: (n, f, { ancestry }) => {
      const [key, value] = Object.entries(n).flat();
      return `{\n${indent(ancestry)}${key}: ${value}\n${indent(ancestry)}}`;
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
      ancestry,
      beforeValue,
    } = node;
    const { process } = actions.find(({ check }) => check(beforeValue));
    return `\n${indent(ancestry)}${getSymbol(type)}${key}: ${process(beforeValue, makeNode, node)}`;
  };
  return `{${ast.map(makeNode).join('')}\n}`;
};
