import buildAST from './ast.js';
import parse from './parsers.js';
import render from './formatters/index.js';


export default (pathToFirstFile, pathToSecondFile, format) => {
  const firstFileParsed = parse(pathToFirstFile);
  const secondFileParsed = parse(pathToSecondFile);
  const ast = buildAST(firstFileParsed, secondFileParsed);
  const formattedDifference = render(ast, format);
  return formattedDifference;
};
