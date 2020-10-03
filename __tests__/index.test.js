import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';


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
