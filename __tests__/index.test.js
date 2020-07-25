import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import parse from '../src/parsers.js';


const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => getFixturePath(filename);
const compareFiles = (pathToFirstFile, pathToSecondFile, format) => {
  const firstFile = readFile(pathToFirstFile);
  const secondFile = readFile(pathToSecondFile);
  const difference = genDiff(firstFile, secondFile, format);
  return difference;
};


const stylishResult = fs.readFileSync(readFile('stylish.txt'), 'utf8');
const plainResult = fs.readFileSync(readFile('plain.txt'), 'utf8');
const toJSONresult = fs.readFileSync(readFile('toJSON.txt'), 'utf8');


describe('test all formatters', () => {
  test.each([
    ['before.json', 'after.json', 'stylish', stylishResult],
    ['before.yml', 'after.yaml', 'plain', plainResult],
    ['before.ini', 'after.ini', 'json', toJSONresult],
  ])('compare %s and %s', (pathToFirstFile, pathToSecondFile, format, expected) => {
    expect(compareFiles(pathToFirstFile, pathToSecondFile, format)).toBe(expected);
  });
});

describe('compare function always returns a string', () => {
  test.each([
    ['before.json', 'after.json', 'string'],
    ['before.yml', 'after.yaml', 'string'],
    ['before.ini', 'after.ini', 'string'],
  ])('comparison between %s and %s returns string', (pathToFirstFile, pathToSecondFile, expected) => {
    expect(typeof compareFiles(pathToFirstFile, pathToSecondFile, 'stylish')).toBe(expected);
  });
});


test('test parser function', () => {
  const parsedJSONfile = JSON.parse(fs.readFileSync(readFile('before.json'), 'utf8'));
  expect(parse(readFile('before.json'))).toStrictEqual(parsedJSONfile);
  expect(typeof parse(readFile('before.json'))).toBe('object');
});
