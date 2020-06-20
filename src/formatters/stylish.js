import { isObject, identity } from 'lodash';

const chooseSymbol = (type) => {
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

const indent = (n) => '  '.repeat(n);

const actions = [
  {
    check: (n) => Array.isArray(n),
    process: (n, f, { ancestry }) => `{${indent(ancestry + 3)}${n.map(f).join('')}\n${indent(ancestry + 1)}}`,
  },
  {
    check: (n) => isObject(n),
    process: (n, f, { ancestry }) => {
      const [key, value] = Object.entries(n).flat();
      return `{\n${indent(ancestry + 3)}${key}: ${value}\n${indent(ancestry + 1)}}`;
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
      value,
    } = node;
    const { process } = actions.find(({ check }) => check(value));
    return `\n${indent(ancestry)}${chooseSymbol(type)}${key}: ${process(value, makeNode, node)}`;
  };
  return `{${ast.map(makeNode).join('')}\n}`;
};
