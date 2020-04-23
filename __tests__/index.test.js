import fs from 'fs';
import path from 'path';
import genDiff from '../src/index';

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');


test('compare before.json with after.json', () => {
  const beforeFile = readFile('before.json');
  const afterFile = readFile('after.json');
  const resultFile = readFile('comparisonResult.txt');
  expect(genDiff(beforeFile, afterFile)).toBe(resultFile);
});
