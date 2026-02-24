#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

//const input = await readFile('./inputs/day12.txt', 'utf-8');
const input = `0:
###
##.
##.

1:
###
##.
.##

2:
.##
###
##.

3:
##.
###
##.

4:
###
#..
###

5:
###
.#.
###

4x4: 0 0 0 0 2 0
12x5: 1 0 1 0 2 2
12x5: 1 0 1 0 3 2`;


const parse = (data) => {
  const lines = data.split('\n');

  let stack = [];
  const objs = [];
  lines.forEach(line => {
    if (!line.trim()) {
      objs.push(stack.slice(1));
      stack = [];
    } else {
      stack.push(line);
    }
  });

  return {
    presents: objs.map(obj => {
      return obj.map(line => line.split('').map(t => t === '#' ? 1 :0))}
    ),
    trees: stack.map(line => {
      const parts = line.split(/\s+/);
      return {
        dimensions: parts[0].slice(0, -1).split('x').map(Number),
        bins: parts.slice(1).map(Number)
      }
    })
  };
}

const centroider = (points) => {
  const dimensions = points[0].length;
  const accumulation = points.reduce((acc, point) => {
    point.forEach((dimension, idx) => {
      acc[idx] += dimension;
    });

    return acc;
  }, Array(dimensions).fill(0));

  return accumulation.map(dimension => dimension / points.length);
}

const rotate = (shape, degree = 90) => {
  const points = shape.reduce((all, arr) => all.concat(arr), []).filter(v => v);
  const [ cx, cy ] = centroider(points);
  
  return shape.map(row => row.map(([x, y]) => {
    return [
      cx + (x - cx) * Math.cos(degree) - (y - cy) * Math.sin(degree),
      cy + (y - cy) * Math.sin(degree) + (x - cx) * Math.cos(degree)
    ];
  }));
}

const place = (shape, xOffset = 0, yOffset = 0) => {
  const placed = shape.slice();

  for (let i = 0; i < placed.length; i++) {
    for (let j = 0; j < placed[0].length; j++) {
      if (placed[i][j] === 1) {
        placed[i][j] = [i + xOffset, j + yOffset];
      }
    }
  }

  return placed;
}

const part1 = (data) => {
  const { presents, trees } = parse(data);

  console.log(place(presents[0], 2, 3));
  console.log(rotate(place(presents[0], 2, 3)));

  return trees;
}

console.log(part1(input));
