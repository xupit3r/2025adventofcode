#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

const input = await readFile('./inputs/day11.txt', 'utf-8');
// const input = `aaa: you hhh
// you: bbb ccc
// bbb: ddd eee
// ccc: ddd eee fff
// ddd: ggg
// eee: out
// fff: out
// ggg: out
// hhh: ccc fff iii
// iii: out`;

const parse = (data) => {
  return data.split(/\n/).map(line => {
    const parts = line.split(/\s+/);

    return {
      name: parts[0].slice(0, -1),
      siblings: parts.slice(1)
    };
  });
}

const paths = (device, graph, current=[], all=new Map(), visited=new Set()) => {
  const key = current.join('->');

  if (!device) {
    all.set(key, current);
    return;
  }

  if (!visited.has(device.name)) {
    current.push(device.name);
    visited.add(device.name);

    for (let i = 0; i < device.siblings.length; i++) {
      paths(graph.get(device.siblings[i]), graph, current, all);
    }

    visited.delete(device.name);
  }

  return all;
}

const part1 = (data) => {
  const devices = parse(data);
  const graph = devices.reduce((m, d) => {
    m.set(d.name, d);
    return m;
  }, new Map());

  return paths(graph.get('you'), graph).size;
}

console.log(part1(input));