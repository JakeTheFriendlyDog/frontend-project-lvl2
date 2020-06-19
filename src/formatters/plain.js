import { isObject, compact } from 'lodash';

const types = [
  {
    check: (n) => n === 'changed',
    process: ({ key, value, oldValue }) => {
      const newValue = isObject(value) ? '[complex value]' : value;
      const content = oldValue ? `${key} was changed from ${oldValue} to ${newValue}` : `${key} was added with value: ${newValue}`;
      return content;
    },
  },
  {
    check: (n) => n === 'deleted',
    process: ({ key }) => `${key} was deleted`,
  },
];


const values = [
  {
    check: (n) => Array.isArray(n),
    process: (n, f) => f(n),
  },
  {
    check: (n) => isObject(n),
    process: () => null,
  },
  {
    check: (n) => !isObject(n),
    process: () => null,
  },
];


export default (ast) => {
  const makeArray = (tree) => {
    const result = tree.flatMap((node) => {
      const { process } = values.find(({ check }) => check(node.value));
      const main = node.type === 'unchanged' ? null : node;
      const children = process(node.value, makeArray);
      return [main, children].flat();
    });
    return result;
  };


  const iter = (node, path) => {
    const { type, value } = node;
    const { process } = types.find(({ check }) => check(type));
    return `Property ${process(node)}`;
  };


  const array = compact(makeArray(ast));
  console.log(array);
  const result = [array.flatMap(iter).join('\n')];
  return `${result}`;
};
