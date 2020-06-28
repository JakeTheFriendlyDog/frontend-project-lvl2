#!/usr/bin/env node
import program from 'commander';
import genDiff from '../index.js';


program
  .version('0.0.8', '-V, --version', 'output the version number')
  .description('Compares two configuration files and outputs a difference between them');

program
  .option('-f --format [type]', 'output format', 'stylish')
  .arguments('<firstConfig> <secondConfig>')
  .action((pathToFirstFile, pathToSecondFile) => {
    console.log(genDiff(pathToFirstFile, pathToSecondFile, program.format));
  });

program.parse(process.argv);
