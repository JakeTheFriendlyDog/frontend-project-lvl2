import buildAST from './ast.js';
import parse from './parsers.js';
import format from './formatters/index.js';


export default (pathToFirstFile, pathToSecondFile, chosenFormat) => {
  const firstFileParsed = parse(pathToFirstFile);
  const secondFileParsed = parse(pathToSecondFile);
  const ast = buildAST(firstFileParsed, secondFileParsed);
  const formattedDifference = format(ast, chosenFormat);
  return formattedDifference;
};
