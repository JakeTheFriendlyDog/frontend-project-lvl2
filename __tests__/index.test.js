import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import parse from '../src/parsers.js';


const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => getFixturePath(filename);
const compareFiles = (pathToFirstFile, pathToSecondFile, chosenFormat) => {
  const firstFile = readFile(pathToFirstFile);
  const secondFile = readFile(pathToSecondFile);
  const output = genDiff(chosenFormat, firstFile, secondFile);
  return output;
};


const stylishResult = parse(readFile('stylish.txt'));
const plainResult = parse(readFile('plain.txt'));
const toJSONresult = parse(readFile('toJSON.txt'));


describe('test all formatters', () => {
  test.each([
    ['before.json', 'after.json', 'stylish', stylishResult],
    ['before.yml', 'after.yaml', 'plain', plainResult],
    ['before.ini', 'after.ini', 'json', toJSONresult],
  ])('compare %s and %s', (file1, file2, format, expected) => {
    expect(compareFiles(file1, file2, format)).toBe(expected);
  });
});

describe('compare function always returns a string', () => {
  test.each([
    ['before.json', 'after.json', 'string'],
    ['before.yml', 'after.yaml', 'string'],
    ['before.ini', 'after.ini', 'string'],
  ])('comparison between %s and %s returns string', (file1, file2, expected) => {
    expect(typeof compareFiles(file1, file2, 'stylish')).toBe(expected);
  });
});


test('test parser function', () => {
  const beforeJson = JSON.parse(fs.readFileSync(readFile('before.json'), 'utf8'));
  expect(parse(readFile('before.json'))).toStrictEqual(beforeJson);
  expect(typeof parse(readFile('before.json'))).toBe('object');
});
