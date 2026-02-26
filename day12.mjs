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
  const shapes = [];
  lines.forEach(line => {
    if (!line.trim()) {
      shapes.push(stack.slice(1));
      stack = [];
    } else {
      stack.push(line);
    }
  });

  return {
    presents: shapes.map(shape => {
      return shape.map((line, x) => {
        return line.split('').map((token, y) => {
          if (token === '#') {
            return [ x, y ]
          } else {
            return false
          }
        }).filter(v => v);
      }).reduce((arr, line) => arr.concat(line), []);
    }),
    trees: stack.map(line => {
      const parts = line.split(/\s+/);
      const bins = parts.slice(1).map(Number);
      const dimensions = parts[0].slice(0, -1).split('x').map(Number);
      const grid = (new Array(dimensions[0])).fill([]).map(() => {
        return new Array(dimensions[1]).fill('.');
      });

      return {
        dimensions,
        grid,
        bins
      }
    })
  };
}

const max = (pts) => Math.max.apply(Math.max, pts);
const min = (pts) => Math.min.apply(Math.min, pts);
const simpleCenter = (points) => {
  const xValues = points.map(pt => pt[0]);
  const yValues = points.map(pt => pt[1]);
  
  return [ 
    min(xValues) + max(xValues) / 2, 
    min(yValues) + max(yValues) / 2
  ];
}

const rotate = (shape, [ cx, cy ]) => {
  return shape.map(([ x, y ]) => {
    const translated = [ x - cx, y - cy ];
    const rotated = [ translated[1], -translated[0]];
    
    return [
      rotated[0] + cx, 
      rotated[1] + cy
    ];
  });
};

const place = (grid, shape, xOffset = 0, yOffset = 0) => {
  for (let i = 0; i < shape.length; i++) {
    const newX = shape[i][0] + xOffset;
    const newY = shape[i][1] + yOffset;

    if (newX < grid.length && newY < grid[0].length) {
      grid[newX][newY] = '#';
    } 
  }

  return grid;
}

const part1 = (data) => {
  const { presents, trees } = parse(data);


  return;
}

console.log(part1(input));
