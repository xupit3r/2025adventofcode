#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

const input = await readFile('./inputs/day11.txt', 'utf-8');
// const input = `svr: aaa bbb
// aaa: fft
// fft: ccc
// bbb: tty
// tty: ccc
// ccc: ddd eee
// ddd: hub
// hub: fff
// eee: dac
// dac: fff
// fff: ggg hhh
// ggg: out
// hhh: out`;

const parse = (data) => {
  return data.split(/\n/).map(line => {
    const parts = line.split(/\s+/);

    return {
      name: parts[0].slice(0, -1),
      siblings: parts.slice(1)
    };
  }).reduce((m, d) => {
    m.set(d.name, d);
    return m;
  }, new Map());
}

const dfs = (device, graph, current=[], visited=new Set(), all=new Map()) => {
  current.push(device);
  visited.add(device);

  if (device === 'out') {
    all.set(current.join('->'), current.slice());
  } else {
    const { siblings } = graph.get(device);  

    for (let i = 0; i < siblings.length; i++) {
      const sibling = siblings[i];
      
      if (!visited.has(sibling)) {
        dfs(sibling, graph, current, visited, all);
      }
    }
  }

  visited.delete(device);
  current.pop();

  return all;
}

const part1 = (data) => dfs('you', parse(data)).size;

const part2 = (data) => {
  const graph =  parse(data);
  return [...dfs('svr', graph).values()].filter(val => {
    const nodes = new Set(val);
    return (nodes.has('dac') && nodes.has('fft'));
  }).length;
}

console.log(part1(input));