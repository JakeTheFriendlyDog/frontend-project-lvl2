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
  const firstFileParsed = getParsedData(pathToFirstFile);
  const secondFileParsed = getParsedData(pathToSecondFile);
  const ast = buildAST(firstFileParsed, secondFileParsed);
  const formattedDifference = render(ast, format);
  return formattedDifference;
};
