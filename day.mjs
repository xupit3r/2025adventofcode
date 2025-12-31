#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

const data = await readFile('./inputs/day1a.txt', 'utf-8');
const splitter = /([LR])([0-9]+)/

const { zeros: password } = data.split('\n').map(str => {
  const result = splitter.exec(str);

  return [
    result[1],
    +result[2]
  ];
}).reduce(({ pointingAt, zeros }, [ direction, amount ]) => {
  zeros = (pointingAt == 0 
    ? zeros + 1 
    : zeros
  );

  pointingAt = (direction === 'L'
    ? pointingAt - amount
    : pointingAt + amount
  ) % 100;

  return {
    pointingAt,
    zeros
  };
}, {
  pointingAt: 50,
  zeros: 0
});

console.log(`the password is ${password}`);

