#!/usr/bin/env node
import fs from 'fs';
import genDiff from '..';

const path = require('path');
const { program } = require('commander');


program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.');

program
  .option('-f --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const pathToFirstFile = path.resolve(firstConfig);
    const pathToSecondFile = path.resolve(secondConfig);
    const firstFileData = fs.readFileSync(pathToFirstFile, (data) => data);
    const secondFileData = fs.readFileSync(pathToSecondFile, (data) => data);
    return genDiff(firstFileData, secondFileData);
  });

program.parse(process.argv);
