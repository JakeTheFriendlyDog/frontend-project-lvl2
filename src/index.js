import fs from 'fs';
import path from 'path';
import buildAST from './ast.js';
import parse from './parsers.js';
import render from './formatters/index.js';

const readFile = (filepath) => fs.readFileSync(filepath, 'utf8');
const getFileExtension = (filepath) => path.extname(path.resolve(filepath));

const getParsedFileContent = (pathToFile) => {
  const fileContent = readFile(pathToFile);
  const fileExtension = getFileExtension(pathToFile);
  return parse(fileContent, fileExtension);
};


export default (pathToFirstFile, pathToSecondFile, format) => {
  const firstFileParsed = getParsedFileContent(pathToFirstFile);
  const secondFileParsed = getParsedFileContent(pathToSecondFile);
  const ast = buildAST(firstFileParsed, secondFileParsed);
  const formattedDifference = render(ast, format);
  return formattedDifference;
};
