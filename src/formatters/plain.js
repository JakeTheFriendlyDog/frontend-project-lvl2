import { isObject, compact } from 'lodash';

const valueToString = (n) => (isObject(n) ? '[complex value]' : n);


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


const nodeTypes = [
  {
    check: (n) => n === 'changed',
    process: ({ key, value, oldValue }) => {
      const content = oldValue ? `'${key}' was changed from ${valueToString(oldValue)} to ${valueToString(value)}` : `'${key}' was added with value: ${valueToString(value)}`;
      return content;
    },
  },
  {
    check: (n) => n === 'deleted',
    process: (node, coll) => `'${makePath(node, coll)}' was deleted`,
  },
];

const makeLine = (node, coll) => {
  const { type } = node;
  const { process } = nodeTypes.find(({ check }) => check(type));
  return `Property ${process(node, coll)}`;
};

const makeArray = (ast) => {
  const result = ast.flatMap((node) => {
    const main = node.type === 'unchanged' ? null : node;
    const children = Array.isArray(node.value) ? makeArray(node.value) : null;
    return [main, children].flat();
  });
  return result;
};

export default (ast) => {
  const compactedNewColl = compact(makeArray(ast));
  const formattedColl = compactedNewColl.flatMap((item) => makeLine(item, compactedNewColl)).join('\n');
  return formattedColl;
};
