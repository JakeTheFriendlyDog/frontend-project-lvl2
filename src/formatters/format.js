import stylish from './stylish.js';
import plain from './plain.js';
import toJson from './toJson.js';


export default (ast, format) => {
  switch (format) {
    case 'plain':
      return plain(ast);
    case 'toJson':
      return toJson(ast);
    default:
      return stylish(ast);
  }
};
