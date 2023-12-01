# Advent of Code

In this repo we run all of the puzzles as unit tests, using `vitest`.

This makes it easy to run both the main puzzles and the 'example' data provided in many puzzles in the same way.

## Getting started

Use regular `npm install` to install the dependencies.

## Running the code

Use `npm start` to launch vitest to run all the puzzle code.

## Running specific puzzles

Use `npm start <puzzle-name>`, e.g. `npm start 2023-01`. This simply uses `vitest`'s built-in test filtering mechanism to control the files to run.

## Starting a new puzzle

Use `npm new-day <year> <day>`, e.g. `npm new-day 2023 2` to create an empty template for that day.

## Other commands

- `npm lint` runs eslint over the code

---

Royston Shufflebotham
