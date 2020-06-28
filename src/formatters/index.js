import makeStylish from './stylish.js';
import makePlain from './plain.js';
import toJSON from './toJSON.js';

export default (ast, type) => {
  switch (type) {
    case 'stylish':
      return makeStylish(ast);
    case 'plain':
      return makePlain(ast);
    case 'json':
    case 'JSON':
      return toJSON(ast);
    default:
      throw new Error(`Unknown formatter: '${type}' ! Unable to format!`);
  }
};
