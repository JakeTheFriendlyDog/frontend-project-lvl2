import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import parse from '../src/parsers.js';


const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFixtureFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');
const compareFiles = (firstFile, secondFile, format) => {
  const pathToFirstFile = getFixturePath(firstFile);
  const pathToSecondFile = getFixturePath(secondFile);
  const difference = genDiff(pathToFirstFile, pathToSecondFile, format);
  return difference;
};


const stylishResult = readFixtureFile('stylish.txt');
const plainResult = readFixtureFile('plain.txt');
const toJSONresult = readFixtureFile('toJSON.txt');


describe('test all formatters', () => {
  test.each([
    ['before.json', 'after.json', 'stylish', stylishResult],
    ['before.yml', 'after.yaml', 'plain', plainResult],
    ['before.ini', 'after.ini', 'json', toJSONresult],
  ])('compare %s and %s', (firstFile, secondFile, format, expected) => {
    expect(compareFiles(firstFile, secondFile, format)).toBe(expected);
  });
});

describe('compare function always returns a string', () => {
  test.each([
    ['before.json', 'after.json', 'string'],
    ['before.yml', 'after.yaml', 'string'],
    ['before.ini', 'after.ini', 'string'],
  ])('comparison between %s and %s returns string', (firstFile, secondFile, expected) => {
    expect(typeof compareFiles(firstFile, secondFile, 'stylish')).toBe(expected);
  });
});


test('test parser function', () => {
  const expectedResult = JSON.parse(fs.readFileSync(getFixturePath('before.json'), 'utf8'));
  const jsonFileContent = readFixtureFile('before.json');
  expect(parse(jsonFileContent, '.json')).toStrictEqual(expectedResult);
  expect(typeof parse(jsonFileContent, '.json')).toBe('object');
});
