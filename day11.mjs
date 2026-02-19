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

const reverse = (graph) => {
  const rev = new Map();

  for (const [name, { siblings }] of graph) {

    if (!rev.has(name)) { 
      rev.set(name, []);
    }

    for (const sib of siblings) {
      if (!rev.has(sib)) {
        rev.set(sib, []);
      }

      rev.get(sib).push(name);
    }
  }
  return rev;
};

const bfs = (start, getNeighbors) => {
  const reached = new Set([start]);
  const queue = [start];

  while (queue.length) {
    const node = queue.shift();

    for (const n of getNeighbors(node)) {
      if (!reached.has(n)) {
        reached.add(n);
        queue.push(n);
      }
    }
  }
  return reached;
};

const dfs = (start, end, graph) => {
  const reverseGraph = reverse(graph);

  const fwd = (node) => graph.has(node) ? graph.get(node).siblings : [];
  const rev = (node) => reverseGraph.get(node) || [];

  // Only consider nodes reachable from start that can also reach end
  const fromStart = bfs(start, fwd);
  const toEnd = bfs(end, rev);
  const relevant = new Set([...fromStart].filter(n => toEnd.has(n)));

  const allPaths = [];
  const visited = new Set();
  const path = [];

  const dive = (node) => {
    path.push(node);
    visited.add(node);

    if (node === end) {
      allPaths.push(path.slice());
    } else {
      for (const sib of fwd(node)) {
        if (!(visited.has(sib) || !relevant.has(sib))) {
          dive(sib);
        }
      }
    }

    visited.delete(node);
    path.pop();
  };

  dive(start);
  return allPaths;
}

const part1 = (data) => dfs('you', 'out', [], parse(data)).length;

const part2 = (data) => {
  const graph = parse(data);

  // break it up into graph sectiopns
  const sf = dfs('svr', 'fft', graph);
  const fd = dfs('fft', 'dac', graph);
  const ds = dfs('dac', 'out', graph);

  // result is the product of all section sizes
  return sf.length * fd.length * ds.length;
}

console.log(part2(input));