#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

const input = await readFile('./inputs/day3.txt', 'utf-8');

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

const findNext = (digits, found) => {
  const sorted = digits.slice().sort(biggest);
  const result = sorted.find(digit => digits.length - digits.indexOf(digit) >= 12 - found.length);
  return (result !== undefined ? result : -1);
}

const part2 = (data) => data.split('\n').map(bank => {
  let digits = bank.split('').map(d => Number(d));
  let found = [];
  let candidate;

  do {
    candidate = findNext(digits, found);
    digits = digits.slice(digits.indexOf(candidate) + 1);

    if (candidate > -1) {
      found.push(candidate);
    } else {
      found = [
        ...found,
        digits.slice(0, 12 - found.length)
      ]
    }
  } while(found.length < 12);

  return Number(found.join(''));
}).reduce((s, v) => s + v, 0);

console.log(part2(input));