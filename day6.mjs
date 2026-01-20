#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

const input = await readFile('./inputs/day6.txt', 'utf-8');

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

const part2 = (input) => {
  const rows = input.split('\n');
  const operators = rows.pop().split(/\s+/);
  const results = [];

  for (let i = 0; i < rows[0].length; i++) {
    results[i] = [];

    for (let j = 0; j < rows.length; j++) {
      results[i][j] = rows[j][i];
    }
  }

  // trailing space to make the rest of this work
  results.push(['']);

  let equation = [];
  let total = 0;
  for (let i = 0; i < results.length; i++) {
    const str = results[i].join('').trim();

    if (!str.length) {
      total += (operators.shift() === '+'
        ? equation.reduce(sum, 0)
        : equation.reduce(product, 1)
      );
      equation = [];
    } else {
      equation.push(Number(str));
    }
  }

  return total;
}

console.log(part2(input));