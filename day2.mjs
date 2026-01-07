#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

const input = await readFile('./inputs/day2.txt', 'utf-8');
const invalidSum = input.split(',').map(range => {
  const [ lower, upper ] = range.split('-');
  const invalids = [];

  for (var i = Number(lower); i <= Number(upper); i++) {
    const iStr = "" + i;
    const halfway = Math.ceil(iStr.length / 2);
    const p1 = iStr.substring(0, halfway);
    const p2 = iStr.substring(halfway);

    if (p1 == p2) {
      invalids.push(i);
    }
  }

  return invalids;
}).reduce((sum, invalids) => {
  return sum + invalids.reduce((s, v) => s + v, 0);
}, 0);

console.log(invalidSum);