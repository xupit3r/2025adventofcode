#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

const input = await readFile('./inputs/day7.txt', 'utf-8');
// const input = `.......S.......
// ...............
// .......^.......
// ...............
// ......^.^......
// ...............
// .....^.^.^.....
// ...............
// ....^.^...^....
// ...............
// ...^.^...^.^...
// ...............
// ..^...^.....^..
// ...............
// .^.^.^.^.^...^.
// ...............`;

const START = 'S';
const BEAM = '|';
const SPLIT = '^';

const part1 = (data) => {
  const diagram = data.split('\n').map(row => row.split(''));
  let splits = 0;

  for (let i = 1; i < diagram.length; i++) {
    for (let j = 0; j < diagram[i].length; j++) {
      const above = diagram[i - 1];

      if (diagram[i][j] === SPLIT) {
        if (above[j] === BEAM || above[j] === START) {
          splits++;

          if (j > 0) {
            diagram[i][j - 1] = BEAM
          }

          if (j < diagram[i].length - 1) {
            diagram[i][j + 1] = BEAM;
          }
        }
      } else if (above[j] === BEAM || above[j] === START) {
        diagram[i][j] = BEAM;
      }
    }
  }

  return splits;
}

console.log(part1(input));