#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

const input = await readFile('./inputs/day3.txt', 'utf-8');
// const input = `987654321111111
// 811111111111119
// 234234234234278
// 818181911112111`;

const biggest = (a, b) => Number(b) - Number(a);

const part1 = (data) => data.split('\n').map(bank => {
  const digits = bank.split('').map(d => Number(d));
  const sorted = digits.slice().sort(biggest);
  const first = (digits.indexOf(sorted[0]) < digits.length - 1
    ? sorted[0]
    : sorted[1]
  );
  const following = digits.slice(digits.indexOf(first) + 1).sort(biggest);

  return Number(`${first}${following[0]}`);
}).reduce((sum, v) => sum + v, 0);

console.log(part1(input));