#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

const input = await readFile('./inputs/day9.txt', 'utf-8');
// const input = `7,1
// 11,1
// 11,7
// 9,7
// 9,5
// 2,5
// 2,3
// 7,3`;

const notMe = (x, y) => ([a, b]) => a !== x && b !== y;
const csvNumber = row => row.split(',').map(Number);
const maxArea = ([ x, y ], _i, arr) => {
  return Math.max.apply(Math.max, arr.filter(notMe(x, y)).map(([a, b]) => {
    return (Math.abs(x - a) + 1) * (Math.abs(y - b) + 1);
  }))
};

const part1 = (data) => {
  return Math.max.apply(
    Math.max, 
    data.split('\n').map(csvNumber).map(maxArea)
  );
}

console.log(part1(input));