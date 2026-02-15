#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

const input = await readFile('./inputs/day10.txt', 'utf-8');
// const input = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
// [...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
// [.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`;

const parse = (data) => data.split('\n').map(line => {
  const parts = line.split(/\s+/);
  const goal = parts[0].slice(1, -1).split('').map(v => v === '#' ? 1 : 0);
  const joltages = parts[parts.length - 1].slice(1, -1).split(',').map(Number);
  const buttons = parts.slice(1, -1).map(r => r.slice(1, -1).split(',').map(Number));

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

const tuplize = (buttons, goal) => 
  buttons.map((button) => button.reduce((ind, idx) => {
    ind[idx] = 1; 
    return ind;
  }, new Array(goal.length).fill(0)));

const combine = (buttons) => buttons.map(btn =>  
  parseInt(btn.join(''), 2)
).reduce((result, number) => result ^ number, 0);

function combinations(arr, r) {
  const result = [];
  const helper = (start, combo) => {
    if (combo.length === r) {
      result.push([...combo]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      combo.push(arr[i]);
      helper(i + 1, combo);
      combo.pop();
    }
  }

  helper(0, []);

  return result;
}

function product(values, repeat) {
  let current = [[]];

  for (let i = 0; i < repeat; i++) {
    const next = [];
    
    for (const combo of current) {
      for (const val of values) {
        next.push([...combo, val]);
      }
    }

    current = next;
  }

  return current;
}

function patterns(coeffs) {
  const numButtons = coeffs.length;
  const numVariables = coeffs[0].length;

  const out = new Map();
  for (const parityPattern of product([0, 1], numVariables)) {
    out.set(parityPattern.join(','), new Map());
  }

  const indices = Array.from({ length: numButtons }, (_, i) => i);
  for (let numPressed = 0; numPressed <= numButtons; numPressed++) {
    for (const buttons of combinations(indices, numPressed)) {
      const pattern = new Array(numVariables).fill(0);

      for (const btn of buttons) {
        for (let j = 0; j < numVariables; j++) {
          pattern[j] += coeffs[btn][j];
        }
      }

      const parityKey = pattern.map(i => i % 2).join(',');
      const patternKey = pattern.join(',');
      const bucket = out.get(parityKey);

      if (!bucket.has(patternKey)) {
        bucket.set(patternKey, numPressed);
      }
    }
  }

  return out;
}

function solveSingle(coeffs, goal) {
  const patternCosts = patterns(coeffs);
  const memo = new Map();

  function aux(goal) {
    const key = goal.join(',');
    if (memo.has(key)) return memo.get(key);

    if (goal.every(i => i === 0)) return 0;

    let answer = Number.MAX_VALUE;
    const parityKey = goal.map(i => i % 2).join(',');
    const bucket = patternCosts.get(parityKey);
    
    if (bucket) {
      for (const [patternKey, patternCost] of bucket) {
        const pattern = patternKey.split(',').map(Number);
        if (pattern.every((p, idx) => p <= goal[idx])) {
          const newGoal = pattern.map((p, idx) => (goal[idx] - p) / 2);
          answer = Math.min(answer, patternCost + 2 * aux(newGoal));
        }
      }
    }

    memo.set(key, answer);
    return answer;
  }

  return aux(goal);
}

const part1 = (data) => {
  const machines = parse(data);
  
  return machines.map(({ goal, buttons }) => {
    const bitButtons = tuplize(buttons, goal);
    const combos = allCombos(bitButtons).sort((a, b) => a.length - b.length);
    const goalNumber = parseInt(goal.join(''), 2);

    return combos.find(combo => {
      return combine(combo) === goalNumber;
    }).length;
  }).reduce((sum, val) => sum + val, 0);
}

const part2 = (data) => {
  return parse(data).map(({ buttons, joltages }) => {
    const bitmasks = tuplize(buttons, joltages);

    return solveSingle(bitmasks, joltages);
  }).reduce((s, v) => s + v, 0);
}

console.log(part2(input));