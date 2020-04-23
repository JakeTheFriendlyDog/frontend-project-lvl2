import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import parse from '../src/parsers.js';

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => getFixturePath(filename);


test('compare before.json with after.json', () => {
  const beforeJson = readFile('before.json');
  const afterJson = readFile('after.json');
  const resultDoc = parse(readFile('comparisonResult.txt'));
  expect(genDiff(beforeJson, afterJson)).toBe(resultDoc);
  expect(typeof (genDiff(beforeJson, afterJson))).toBe('string');
});

test('compare before.yml with after.yaml', () => {
  const beforeYaml = readFile('before.yml');
  const afterYaml = readFile('after.yaml');
  const resultDoc = parse(readFile('comparisonResult.txt'));
  expect(genDiff(beforeYaml, afterYaml)).toBe(resultDoc);
  expect(typeof (genDiff(beforeYaml, afterYaml))).toBe('string');
});


test('test parser', () => {
  const beforeJson = JSON.parse(fs.readFileSync(readFile('before.json'), (data) => data));
  expect(parse(readFile('before.json'))).toStrictEqual(beforeJson);
  expect(typeof parse(readFile('before.json'))).toBe('object');
});
