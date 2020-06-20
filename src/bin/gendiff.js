#!/usr/bin/env node
import program from 'commander';
import genDiff from '../index.js';


program
  .version('0.0.8', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.');

program
  .option('-f --format [type]', 'output format', 'stylish')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(program.format, firstConfig, secondConfig));
  });

program.parse(process.argv);
