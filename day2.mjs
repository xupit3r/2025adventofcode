#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

const input = await readFile('./inputs/day2.txt', 'utf-8');

const generateRangeValues = (range) => {
  const [ lower, upper ] = range.split('-');
  const values = [];

  for (var i = Number(lower); i <= Number(upper); i++) {
    values.push(i);
  }

  return values;
}

const sumInvalids = (sum, invalids) => {
  return sum + invalids.reduce((s, v) => s + v, 0);
};

const part1 = (data) => data.split(',').map(range => {
  return generateRangeValues(range).map(value => {
    const valueStr = "" + value;
    const halfway = Math.ceil(valueStr.length / 2);
    const p1 = valueStr.substring(0, halfway);
    const p2 = valueStr.substring(halfway);

    if (p1 == p2) {
      return value;
    }

    return -1;
  }).filter(v => v > -1);
}).reduce(sumInvalids, 0);

const part2 = (data) => data.split(',').map(range => {
  return generateRangeValues(range).map(value => {
    const valueStr = "" + value;
    const twice = valueStr + valueStr;

    if (twice.indexOf(valueStr, 1) < valueStr.length) {
      return value;
    }

    return -1;
  }).filter(v => v > -1);
}).reduce(sumInvalids, 0);

console.log(part2(input));