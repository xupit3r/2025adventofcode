#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

const input = await readFile('./inputs/day5.txt', 'utf-8');
// const input = `3-5
// 10-14
// 16-20
// 12-18

// 1
// 5
// 8
// 11
// 17
// 32`;

const parse = (input) => {
  return input.split('\n').reduce((result, row) => {
    if (row.indexOf('-') > -1) {
      const [lower, upper] = row.split('-').map(Number);
      result.fresh.push(id => id >= lower && id <= upper);
    } else if (row.trim().length) {
      result.ids.push(Number(row));
    }

    return result;
  }, {
    fresh: [],
    ids: []
  });
}

const part1 = (input) => {
  const { fresh, ids } = parse(input);
  return ids.filter(id => {
    let found = false;
    
    for (let i = 0; i < fresh.length && !found; i++) {
      found = fresh[i](id);
    }

    return found;
  }).length;
}

console.log(part1(input));