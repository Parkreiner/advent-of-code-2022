# Day 8

## Part 1 notes

- We're trying to build a treehouse in a grid of trees, but we want it to be hidden
- Each tree is represented by a number, which is its height (lowest is 0, hightest is 9)
- A tree is visible if all the trees in the same row and column are shorter than it
- All trees along the outer edge are visible by definition
- The goal is to find the number of trees that are visible from the outside

### Part 1 approach

1. Count the number of trees along the outer edge, since those are always visible. Keep this count variable for later.
2. For each tree in the inner grid:
   1. For each direction that the check could happen in (left, right, up, down):
      1. Check the next adjacent tree to see if it has a lower value
      2. If the tree has a higher or equal value, move on to the next direction
      3. If we manage to get to the entire outer edge, then the tree should be counted, and we can safely move on to the next tree

### Ideas

- I could probably memoize whether a tree is visible, so that once I compare an adjacent tree against it, I don't have to go through the whole forest to recalculate things
  - Seems like a pretty obvious candidate for table-based dynamic programming
