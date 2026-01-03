#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

const data = await readFile('./inputs/day1.txt', 'utf-8');
const splitter = /([LR])([0-9]+)/;

const dataArray = data.split('\n').map(str => {
  const result = splitter.exec(str);

  return [
    result[1],
    Number(result[2])
  ];
});

const part1 = (input) => {
  return input.reduce(({ pointingAt, password }, [ direction, amount ]) => {
    password = (pointingAt == 0 
      ? password + 1 
      : password
    );

    pointingAt = (direction === 'L'
      ? pointingAt - amount
      : pointingAt + amount
    ) % 100;

    return {
      pointingAt,
      password
    };
  }, {
    pointingAt: 50,
    password: 0
  });
}

const part2 = (input) => {
  return input.reduce(({ pointingAt, password }, [ direction, amount ]) => {
    // are we currently pointing at 0?
    const boundedAdd = pointingAt === 0 ? 0 : 1;

    // adjusted dial
    pointingAt += (direction === 'L'
      ? amount * -1
      : amount
    ) % 100;

    // now check where we are pointing and update
    // password accordingly
    if (pointingAt > 99) {
      pointingAt = pointingAt - 100;
      password += boundedAdd;
    } else if (pointingAt < 0) {
      pointingAt = 100 + pointingAt;
      password += boundedAdd;
    } else if (pointingAt === 0) {
      password += boundedAdd;
    }


    // full turns
    password += Math.floor(amount / 100);

    return {
      pointingAt,
      password
    };
  }, {
    pointingAt: 50,
    password: 0
  });
}

//const { password } = part1(dataArray);
const { password } = part2(dataArray);

console.log(`the password is ${password}`);

