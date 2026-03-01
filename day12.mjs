#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

const input = await readFile('./inputs/day12.txt', 'utf-8');
// const input = `0:
// ###
// ##.
// ##.

// 1:
// ###
// ##.
// .##

// 2:
// .##
// ###
// ##.

// 3:
// ##.
// ###
// ##.

// 4:
// ###
// #..
// ###

// 5:
// ###
// .#.
// ###

// 4x4: 0 0 0 0 2 0
// 12x5: 1 0 1 0 2 2
// 12x5: 1 0 1 0 3 2`;


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

const gatherPresents = (tree, presents) => tree.bins.map((quantity, idx) => {
    const shapes = [];
    for (let i = 0; i < quantity; i++) {
      shapes.push(presents[idx].slice());
    }

    return shapes;
  }).reduce((arr, shapes) => arr.concat(shapes));

const dopesItFit = (tree, presents) => {
  const totalArea = tree.dimensions[0] * tree.dimensions[1];
  const presentArea = gatherPresents(tree, presents).reduce((a, p) => a + p.length, 0);

  return totalArea >= presentArea;
}

const part1 = (data) => {
  const { presents, trees } = parse(data);
  return trees.map(tree => dopesItFit(tree, presents))
                           .reduce((count, v) => v ? ++count : count, 0);
}

console.log(part1(input));
