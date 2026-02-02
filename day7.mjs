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

const isNumber = (n) => typeof n === 'number';

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

const part2 = (data) => {
  const diagram = data.split('\n').map(row => row.split(''));

  for (let i = 1; i < diagram.length; i++) {
    const vals = [];

    for (let j = 0; j < diagram[i].length; j++) {
      const above = diagram[i -1];

      if (diagram[i][j] === SPLIT && isNumber(above[j])) {
        vals[j] = diagram[i][j];

        vals[j - 1] = above[j] + (isNumber(vals[j - 1])
          ? vals[j - 1]
          : 0
        );

        vals[j + 1] = above[j] + (isNumber(vals[j + 1])
          ? vals[j + 1]
          : 0
        );
      } else if (isNumber(above[j])) {
        vals[j] = above[j] + (isNumber(vals[j])
          ? vals[j]
          : 0
        );
      } else if (above[j] === START) {
        vals[j] = 1;
      }
    }

    vals.forEach((v, k) => diagram[i][k] = v);
  }

  return diagram[diagram.length - 1].filter(v => typeof v === 'number').reduce((s, v) => s + v, 0);
}

console.log(part2(input));