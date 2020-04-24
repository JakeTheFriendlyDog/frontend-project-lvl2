import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import parse from '../src/parsers.js';

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => getFixturePath(filename);
const compare = (pathToFirstFile, pathToSecondFile) => {
  const firstFile = readFile(pathToFirstFile);
  const secondFile = readFile(pathToSecondFile);
  const result = genDiff(firstFile, secondFile);
  return result;
};

const resultDoc = parse(readFile('comparisonResult.txt'));

describe('test function that compares', () => {
  test.each([
    ['before.json', 'after.json', resultDoc],
    ['before.yml', 'after.yaml', resultDoc],
    ['before.ini', 'after.ini', resultDoc],
  ])('compare %s and %s', (file1, file2, expected) => {
    expect(compare(file1, file2)).toBe(expected);
  });
});

describe('function always returns string', () => {
  test.each([
    ['before.json', 'after.json', 'string'],
    ['before.yml', 'after.yaml', 'string'],
    ['before.ini', 'after.ini', 'string'],
  ])('comparison between %s and %s returns string', (file1, file2, expected) => {
    expect(typeof compare(file1, file2)).toBe(expected);
  });
});


test('test parser function', () => {
  const beforeJson = JSON.parse(fs.readFileSync(readFile('before.json'), 'utf8'));
  expect(parse(readFile('before.json'))).toStrictEqual(beforeJson);
  expect(typeof parse(readFile('before.json'))).toBe('object');
});
