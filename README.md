# Advent of Code 2025 — Solutions (JavaScript)

This repository contains my solutions for Advent of Code 2025 implemented as ES modules.

**Project:** Solutions for days 1–9 (one file per day).

**Requirements:**
- Node.js 18+ (or any Node that supports ES modules and top-level await)

**Run a single day**

Place the puzzle input in the `inputs/` directory (for example `inputs/day1.txt`). Run a solution with:

```bash
./day1.mjs
```

Replace `day1.mjs` with the day you want to run.

**Run all days (simple loop)**

```bash
for d in {1..9}; do "./day${d}.mjs"; done
```

**File structure**

- [day1.mjs](day1.mjs) — Day 1 solution
- [day2.mjs](day2.mjs) — Day 2 solution
- [day3.mjs](day3.mjs) - Day 3 solution
- [day4.mjs](day4.mjs) - Day 4 solution
- [day5.mjs](day5.mjs) - Day 5 solution
- [day6.mjs](day6.mjs) - Day 6 solution
- [day7.mjs](day7.mjs) - Day 7 solution
- [day8.mjs](day8.mjs) - Day 8 solution
- [day9.mjs](day9.mjs) - Day 9 solution
- inputs/ — puzzle input files (e.g., [inputs/day1.txt](inputs/day1.txt))

**Add a new day**

1. Add `day10.mjs` implementing the solution (see previous days for basic setup)
2. Add the corresponding input file at `inputs/day10.txt`.
3. Run with `chmod +x day10.mjs`.
4. Run with `./day10.mjs` or `node day10.mjs`.
  

**License**

No license specified. Use at your own discretion.
