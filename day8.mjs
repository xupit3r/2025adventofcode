#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

const input = await readFile('./inputs/day8.txt', 'utf-8');
// const input = `162,817,812
// 57,618,57
// 906,360,560
// 592,479,940
// 352,342,300
// 466,668,158
// 542,29,236
// 431,825,988
// 739,650,466
// 52,470,668
// 216,146,977
// 819,987,18
// 117,168,530
// 805,96,715
// 346,949,466
// 970,615,88
// 941,993,340
// 862,61,35
// 984,92,344
// 425,690,689`;

const NUM_PAIRS = 1000;
const X = 0;
const Y = 1;
const Z = 2;

const distance = (a, b) =>
  Math.pow(a[X] - b[X], 2) + 
  Math.pow(a[Y] - b[Y], 2) + 
  Math.pow(a[Z] - b[Z], 2);

const buildCircuits = (boxes) => 
  boxes.map((_box, i) => ({
    rep: i, 
    boxes: new Set([i])
  }));

const sizeCircuits = (circuits) => 
  circuits.filter(({ rep }, i) => rep === i)
          .map(circuit => circuit.boxes.size);

const buildConnections = (boxes) => {
  const connections = [];

  for (let i = 0; i < boxes.length - 1; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      connections.push([i, j, distance(boxes[i], boxes[j])]);
    }
  }
  
  return connections.sort((a, b) => a[2] - b[2]);
};

const topCircuits = (boxes, connections, number) => {
  const circuits = buildCircuits(boxes);

  connections.slice(0, number).forEach(([a, b]) => {
    if (!circuits[a].boxes.has(b)) {
      circuits[b].boxes.forEach(box => {
        circuits[a].boxes.add(box);
        circuits[box] = circuits[a];
      });
    }
  });

  return circuits;
}

const part1 = (data) => {
  const boxes = data.split('\n').map(row => row.split(',').map(Number));
  const connections = buildConnections(boxes);
  const circuits = topCircuits(boxes, connections, NUM_PAIRS);
  const sizes = sizeCircuits(circuits);

  return sizes.sort((a, b) => b - a).slice(0, 3).reduce((p, v) => p * v, 1);
};

console.log(part1(input));