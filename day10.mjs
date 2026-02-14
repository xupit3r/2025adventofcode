#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

// const input = await readFile('./inputs/day10.txt', 'utf-8');
const input = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`;

const press = (goal) => (button) => button.reduce((ind, idx) => { 
  ind[idx] ^= 1; 
  return ind;
}, new Array(goal.length).fill(0));

const parse = (data) => data.split('\n').map(line => {
  const goal = [
    ...line.matchAll(/\[([^\]]+)\]/g)
  ].map(m => m[1])[0].split('').map(v => v === '#' ? 1 : 0);

  const buttons = [
    ...line.matchAll(/\(([^)]+)\)/g)
  ].map(m => m[1].split(',').map(Number)).sort((a, b) => b.length - a.length);

  const joltages = [
    ...line.matchAll(/\{([^}]+)\}/g)
  ].flatMap(m => m[1].split(',').map(Number));

  return {
    goal,
    joltages,
    buttons,
  };
});

const allCombos = (arr) => {
  const result = [];
  const n = arr.length;

  for (let i = 1; i < Math.pow(2, n); i++) {
    const combination = [];

    for (let j = 0; j < n; j++) {
      if ((i >> j) & 1) {
        combination.push(arr[j]);
      }
    }

    result.push(combination);
  }
  return result;
}

const combine = (buttons, goal) => buttons.map(btn =>  
  parseInt(btn.join(''), 2)
).reduce((result, number) => result ^ number, 0);

const part1 = (data) => {
  const machines = parse(data);
  
  return machines.map(machine => {
    const bitButtons = machine.buttons.map(press(machine.goal));
    const combos = allCombos(bitButtons).sort((a, b) => a.length - b.length);
    const goal = parseInt(machine.goal.join(''), 2);

    return combos.find(combo => {
      return combine(combo) === goal;
    }).length;
  }).reduce((sum, val) => sum + val, 0);
}

const part2 = (data) => {
  const machines = parse(data);

  return machines.map(({ buttons, joltages }) => {
    const expectedLights = joltages.map(j => j % 2);
    const bitButtons = buttons.map(press(expectedLights));
    const combos = allCombos(bitButtons);
    const goal = parseInt(expectedLights.join(''), 2);
    const valid = combos.filter(combo => {
      return combine(combo) === goal;
    });



    return valid.map(combo => {
      const tally = joltages.slice();
      const joltageLeft = () => tally.reduce((s, v) => s + v, 0);
      const presses = [];

      while (joltageLeft()) {
        // find most appropriate button to press first
        // apply button press (i.e. update tally)
        // store button press in presses
      }

      return presses.length;
    }).reduce((s, v) => s + v, 0);
  });
}

console.log(part2(input));