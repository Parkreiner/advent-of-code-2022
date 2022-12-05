# Day 5

## Part 1 notes

- The ship needs supplies; the supplies are stored in stacks of marked crates
- The crates need to be rearranged
- Crates can be moved between stacks; the goal is to have some specific crate at the top of each stack, maybe?
- The elves seem unaware of the final crate arrangement
- Text input will consist of two parts:
  - A stack diagram, indicating the starting positions of the crates
  - A set of instructions for moving the crates, given in the form:
    - `Move (quantity) from (source stack) to (target stack)`
  - Even if multiple crates must be moved, they must be moved one at a time

### Possible steps

1. Parse the stacks from the top half of the input; represent as a map of stack arrays
2. For each line of the bottom half:
   1. Parse the quantity, source ID, and target ID from the line
   2. Make sure that the IDs exist within the map, and that the requested quanity can be taken from the source stack
   3. Keep removing items from the source stack, and add them to the target stack

## Part 2 notes

- The crane mover is more sophisticated than we thought; it can move multiple crates at a time
- That's all that changes, but this also means that the previous order of the stacks is now preserved when moved from the source to the target

### Possible steps

1. Parse the stacks from the top half of the input; represent as a map of stack arrays
2. For each line of the bottom half:
   1. Parse the quantity, source ID, and target ID from the line
   2. Make sure that the IDs exist within the map, and that the requested quanity can be taken from the source stack
   3. Keep removing items from the source stack, and add them to the target stack. However, do it in a way that preserves the order of the crates
