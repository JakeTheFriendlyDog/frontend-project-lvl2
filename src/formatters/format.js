import stylish from './stylish.js';
import plain from './plain.js';
import toJson from './toJSON.js';


export default (ast, format) => {
  switch (format) {
    case 'plain':
      return plain(ast);
    case 'json':
    case 'JSON':
      return toJson(ast);
    default:
      return stylish(ast);
  }
};
