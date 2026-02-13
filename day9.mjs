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
const area = (x1, y1, x2, y2) => (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1);
const maxArea = ([ x, y ], _i, arr) => {
  return Math.max.apply(Math.max, arr.filter(notMe(x, y)).map(([a, b]) => {
    return area(x, y, a, b);
  }))
};
const makeEdges = (points) => {
  const edges = [];

  for (let i = 0; i < points.length; i++) {
    const pt1 = points[i];
    const pt2 = points[(i + 1) % points.length];
    edges.push([
      pt1,
      pt2
    ]);

  }

  return edges;
}
const makePairs = (points) => {
  const pairs = new Set();

  points.forEach((pt1, _i, arr) => {
    arr.filter(notMe).forEach(pt2 => {
      const a = area(pt1[0], pt1[1], pt2[0], pt2[1]);
      pairs.add([ pt1, pt2, a])
    });
  });

  return Array.from(pairs);
};
const overlap = (a1, a2, b1, b2) =>{
  return (
    !(a1 <= b1 && 
      a1 <= b2 && 
      a2 <= b1 && 
      a2 <= b2) &&
    !(a1 >= b1 && 
      a1 >= b2 && 
      a2 >= b1 && 
      a2 >= b2)
  );
}


const part1 = (data) => {
  return Math.max.apply(
    Math.max, 
    data.split('\n').map(csvNumber).map(maxArea)
  );
}

const part2 = (data) => {
  const points = data.split('\n').map(csvNumber);
  const pairs = makePairs(points).sort((a, b) => b[2] - a[2]);
  const edges = makeEdges(points);

  return pairs.find(([ [x1, y1], [x2, y2]]) => {
    return !edges.some(([[a1, b1], [a2, b2]])=> {
      return (
        overlap(b1, b2, y1, y2) && 
        overlap(a1, a2, x1, x2)
      );
    });
  })[2];
}

console.log(part2(input));