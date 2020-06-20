import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import parse from '../src/parsers.js';


const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => getFixturePath(filename);
const compare = (pathToFirstFile, pathToSecondFile, chosenFormat) => {
  const firstFile = readFile(pathToFirstFile);
  const secondFile = readFile(pathToSecondFile);
  const result = genDiff(firstFile, secondFile, chosenFormat);
  return result;
};


const resultStylish = parse(readFile('stylish.txt'));
const resultPlain = parse(readFile('plain.txt'));
const resultToJson = parse(readFile('toJson.txt'));


describe('test formatters', () => {
  test.each([
    ['before.json', 'after.json', 'stylish', resultStylish],
    ['before.yml', 'after.yaml', 'plain', resultPlain],
    ['before.ini', 'after.ini', 'json', resultToJson],
  ])('compare %s and %s', (file1, file2, format, expected) => {
    expect(compare(file1, file2, format)).toBe(expected);
  });
});

describe('function always returns a string', () => {
  test.each([
    ['before.json', 'after.json', 'string'],
    ['before.yml', 'after.yaml', 'string'],
    ['before.ini', 'after.ini', 'string'],
  ])('comparison between %s and %s returns string', (file1, file2, expected) => {
    expect(typeof compare(file1, file2, 'stylish')).toBe(expected);
  });
});


test('test parser function', () => {
  const beforeJson = JSON.parse(fs.readFileSync(readFile('before.json'), 'utf8'));
  expect(parse(readFile('before.json'))).toStrictEqual(beforeJson);
  expect(typeof parse(readFile('before.json'))).toBe('object');
});
