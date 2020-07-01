import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import toJSON from './toJSON.js';

export default (ast, type) => {
  switch (type) {
    case 'stylish':
      return formatStylish(ast);
    case 'plain':
      return formatPlain(ast);
    case 'json':
    case 'JSON':
      return toJSON(ast);
    default:
      throw new Error(`Unknown formatter: '${type}' ! Unable to format!`);
  }
};
