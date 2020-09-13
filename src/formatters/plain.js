import { isObject, compact } from 'lodash';

const stringifyValue = (n) => (isObject(n) ? '[complex value]' : n);


const makePathToNode = (node, coll) => {
  const iter = ({ key, ancestry, parent }, arr, path) => {
    const newPath = [...path, key, parent];
    if (parent === null || ancestry === 1) {
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
    process: ({ key, beforeValue, afterValue }) => {
      const content = afterValue ? `'${key}' was changed from ${stringifyValue(afterValue)} to ${stringifyValue(beforeValue)}` : `'${key}' was added with value: ${stringifyValue(beforeValue)}`;
      return content;
    },
  },
  {
    check: (n) => n === 'deleted',
    process: (node, coll) => `'${makePathToNode(node, coll)}' was deleted`,
  },
];

const formatOutputLine = (node, coll) => {
  const { type } = node;
  const { process } = nodeTypes.find(({ check }) => check(type));
  return `Property ${process(node, coll)}`;
};

const buildArray = (ast) => {
  const result = ast.flatMap((node) => {
    const main = node.type === 'unchanged' ? null : node;
    const children = Array.isArray(node.beforeValue) ? buildArray(node.beforeValue) : null;
    return [main, children].flat();
  });
  return result;
};

export default (ast) => {
  const outputLines = compact(buildArray(ast));
  const formattedOutput = outputLines.flatMap((item) => formatOutputLine(item, outputLines)).join('\n');
  return formattedOutput;
};
