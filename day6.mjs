#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

const input = await readFile('./inputs/day6.txt', 'utf-8');
// const input = `123 328  51 64 
//  45 64  387 23 
//   6 98  215 314
// *   +   *   +`;

const sum = (s, v) => s + v;
const product = (s, v) => s * v;

const part1 = (input) => {
  const rows = input.split('\n').map(row => row.trim().split(/\s+/));
  const operators = rows.pop().map(o => o.trim());
  const numbers = rows.map(row => row.map(Number));
  const results = [];

  for (let i = 0; i < numbers[0].length; i++) {
    const column = numbers.map(arr => arr[i]);

    results.push(operators[i] === '+'
      ? column.reduce(sum, 0)
      : column.reduce(product, 1)
    );
  }

  return results.reduce(sum);
}

console.log(part1(input));