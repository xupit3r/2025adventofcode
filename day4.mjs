#!/usr/bin/env node

import { count } from 'node:console';
import { readFile } from 'node:fs/promises';

const input = await readFile('./inputs/day4.txt', 'utf-8');
// const input = `..@@.@@@@.
// @@@.@.@.@@
// @@@@@.@.@@
// @.@@@@..@.
// @@.@@@@.@@
// .@@@@@@@.@
// .@.@.@.@@@
// @.@@@.@@@@
// .@@@@@@@@.
// @.@.@@@.@.`;

const PAPER_ROLL = '@';

const neighbors = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
  [1, 1],
  [-1, -1],
  [1, -1], 
  [-1, 1]
];

const countRolls = (i, j, grid) => {
  const m = grid.length;
  const n = grid[0].length;

  return neighbors.map(([ dx, dy ]) => {
    const x = i + dx;
    const y = j + dy;
    
    if (x >= 0 && x < m && y >= 0 && y < n) {
      return grid[x][y];
    }  

    return -1;
  }).reduce((count, val) => {
    if (val === PAPER_ROLL) {
      count++;
    }

    return count;
  }, 0);
}

const part1 = (input) => {
  const grid = input.split('\n').map(row => row.split(''));
  let total = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const count = countRolls(i, j, grid);

      if (grid[i][j] === PAPER_ROLL && count < 4) {
        total++;
      }
    }
  }

  return total;
}

console.log(part1(input));