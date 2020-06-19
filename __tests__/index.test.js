import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import parse from '../src/parsers.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';


const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => getFixturePath(filename);
const compare = (pathToFirstFile, pathToSecondFile, format) => {
  const firstFile = readFile(pathToFirstFile);
  const secondFile = readFile(pathToSecondFile);
  const ast = genDiff(firstFile, secondFile);
  const result = format(ast);
  return result;
};


const resultStylish = parse(readFile('comparisonResult.txt'));
const resultPlain = parse(readFile('plain.txt'));


describe('test stylish formatter', () => {
  test.each([
    ['before.json', 'after.json', resultStylish],
    ['before.yml', 'after.yaml', resultStylish],
    ['before.ini', 'after.ini', resultStylish],
  ])('compare %s and %s', (file1, file2, expected) => {
    expect(compare(file1, file2, stylish)).toBe(expected);
  });
});


describe('test plain formatter', () => {
  test.each([
    ['before.json', 'after.json', resultPlain],
    ['before.yml', 'after.yaml', resultPlain],
    ['before.ini', 'after.ini', resultPlain],
  ])('compare %s and %s', (file1, file2, expected) => {
    expect(compare(file1, file2, plain)).toBe(expected);
  });
});


describe('function always returns a string', () => {
  test.each([
    ['before.json', 'after.json', 'string'],
    ['before.yml', 'after.yaml', 'string'],
    ['before.ini', 'after.ini', 'string'],
  ])('comparison between %s and %s returns string', (file1, file2, expected) => {
    expect(typeof compare(file1, file2, stylish)).toBe(expected);
  });
});


test('test parser function', () => {
  const beforeJson = JSON.parse(fs.readFileSync(readFile('before.json'), 'utf8'));
  expect(parse(readFile('before.json'))).toStrictEqual(beforeJson);
  expect(typeof parse(readFile('before.json'))).toBe('object');
});
