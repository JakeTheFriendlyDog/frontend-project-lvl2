import { isObject, compact } from 'lodash';

const isComplex = (n) => (isObject(n) ? '[complex value]' : n);


const makePath = (node, coll) => {
  const iter = ({ key, ancestry, parent }, arr, path) => {
    const newPath = [...path, key, parent];
    if (parent === null || ancestry === 2) {
      return compact(newPath).join('.');
    }

    const parentNode = arr.find((n) => n.key === parent);
    return iter(parentNode, arr, newPath);
  };

  return iter(node, coll, []);
};

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


const types = [
  {
    check: (n) => n === 'changed',
    process: ({ key, value, oldValue }) => {
      const content = oldValue ? `'${key}' was changed from ${isComplex(oldValue)} to ${isComplex(value)}` : `'${key}' was added with value: ${isComplex(value)}`;
      return content;
    },
  },
  {
    check: (n) => n === 'deleted',
    process: (node, coll) => `'${makePath(node, coll)}' was deleted`,
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

  const iter = (node, coll) => {
    const { type } = node;
    const { process } = types.find(({ check }) => check(type));
    return `Property ${process(node, coll)}`;
  };


  const array = compact(makeArray(ast));
  const result = [array.flatMap((item) => iter(item, array)).join('\n')];
  return `${result}`;
};
