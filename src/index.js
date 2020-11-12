import fs from 'fs';
import path from 'path';
import buildAST from './ast.js';
import parse from './parsers.js';
import render from './formatters/index.js';

const readFile = (filepath) => fs.readFileSync(filepath, 'utf8');
const getFileExtension = (filepath) => path.extname(path.resolve(filepath));

const getParsedData = (pathToFile) => {
  const data = readFile(pathToFile);
  const dataFormat = getFileExtension(pathToFile);
  return parse(data, dataFormat);
};


export default (pathToFirstFile, pathToSecondFile, format) => {
  const firstParsedData = getParsedData(pathToFirstFile);
  const secondParsedData = getParsedData(pathToSecondFile);
  const ast = buildAST(firstParsedData, secondParsedData);
  const formattedDifference = render(ast, format);
  return formattedDifference;
};
