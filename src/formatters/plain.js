import { isObject, compact } from 'lodash';

const valueToString = (n) => (isObject(n) ? '[complex value]' : n);


const makePathToNode = (node, coll) => {
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
    process: ({ key, beforeValue, afterValue }) => {
      const content = afterValue ? `'${key}' was changed from ${valueToString(afterValue)} to ${valueToString(beforeValue)}` : `'${key}' was added with value: ${valueToString(beforeValue)}`;
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

const astToArray = (ast) => {
  const result = ast.flatMap((node) => {
    const main = node.type === 'unchanged' ? null : node;
    const children = Array.isArray(node.beforeValue) ? astToArray(node.beforeValue) : null;
    return [main, children].flat();
  });
  return result;
};

export default (ast) => {
  const outputLines = compact(astToArray(ast));
  const formattedOutput = outputLines.flatMap((item) => formatOutputLine(item, outputLines)).join('\n');
  return formattedOutput;
};
