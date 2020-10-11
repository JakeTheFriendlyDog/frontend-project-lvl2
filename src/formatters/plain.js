import { isObject } from 'lodash';

const stringifyValue = (n) => (isObject(n) ? '[complex value]' : n);


// const makePathToNode = (node, coll) => {
//   const iter = ({ key, depth, parent }, arr, path) => {
//     const newPath = [...path, key, parent];
//     if (parent === null || depth === 1) {
//       return compact(newPath).join('.');
//     }


// const nodeTypes = [
//   {
//     check: (n) => n === 'changed',
//     process: ({ key, beforeValue, afterValue }) => {
//       const content = afterValue
//    ? `'${key}' was changed from ${stringifyValue(afterValue)} to ${stringifyValue(beforeValue)}`
//         : `'${key}' was added with value: ${stringifyValue(beforeValue)}`;
//       return content;
//     },
//   },
//   {
//     check: (n) => n === 'deleted',
//     process: (node, coll) => `'${makePathToNode(node, coll)}' was deleted`,
//   },
//   {
//     check: (n) => n === 'added',
//     process: (node, coll) => `'${makePathToNode(node, coll)}' was added`,
//   },
// ];

// const formatOutputLine = (node, coll) => {
//   const { type } = node;
//   const { process } = nodeTypes.find(({ check }) => check(type));
//   return `Property ${process(node, coll)}`;
// };

// const buildArray = (ast) => {
//   const result = ast.flatMap((node) => {
//     const main = node.type === 'unchanged' ? null : node;
//     const children = Array.isArray(node.beforeValue)
//       ? buildArray(node.beforeValue) : null;
//     return [main, children].flat();
//   });
//   return result;
// };

// export default (ast) => {
//   const outputLines = compact(buildArray(ast));
//   console.log(ast);
//   const formattedOutput = outputLines.flatMap(
//     (item) => formatOutputLine(item, outputLines),
//   ).join('\n');
//   return formattedOutput;
// };

export default (ast) => {
  const iter = (coll, path) => {
    const result = coll
      .filter((n) => n.type === 'unchanged' && !Array.isArray(n.beforeValue))
      .map(({
        key, type, beforeValue, afterValue,
      }) => {
        const fullPath = path ? [...path, key].join('.') : key;
        if (Array.isArray(beforeValue)) {
          return iter(beforeValue, [...path, key]);
        }
        switch (type) {
          case 'added':
            return `Property ${fullPath} was added with value: ${stringifyValue(beforeValue)}`;
          case 'deleted':
            return `Property ${fullPath} was deleted`;
          case 'changed':
            return `Property ${fullPath} was changed from '${stringifyValue(beforeValue)}' to '${stringifyValue(afterValue)}'`;
          default:
            throw new Error(`Error! Type '${type}' is unknown.`);
        }
      });
    return result.join('\n');
  };

  return iter(ast, []);
};
