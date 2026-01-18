#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

const input = await readFile('./inputs/day5.txt', 'utf-8');

const buildLookup = (input) => {
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
  const { fresh, ids } = buildLookup(input);
  return ids.filter(id => {
    let found = false;

    for (let i = 0; i < fresh.length && !found; i++) {
      found = fresh[i](id);
    }

    return found;
  }).length;
}

const part2 = (input) => {
  const ranges = input.split('\n')
                      .filter(row => row.indexOf('-') > -1)
                      .map(row => row.split('-').map(Number))
                      .sort((a, b) => a[0] - b[0]);
  const result = [];
  let lower = ranges[0][0];
  let upper = ranges[0][1];

  for (let i = 1; i < ranges.length; i++) {
    const current = ranges[i];

    if (current[0] > upper) {
      result.push([ lower, upper ]);
      lower = current[0];
      upper = current[1];
    } else if (current[1] > upper) {
      upper = current[1];
    }
  }

  result.push([ lower, upper ]);

  return result.reduce((sum, [ lower, upper ]) => sum + (upper - lower) + 1, 0);
}

console.log(part2(input));