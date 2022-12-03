# Day 3 notes

## Part 1

- We have multiple rucksacks, each with two compartments
  - All items of a type will all go into the same compartment
- Each rucksack is represented as a case-sensitive string, where each character represents one item
- Each rucksack will have an even number of items, and the items should be split evenly between the two compartments
- Because of the organization mishaps, it sounds like each rucksack will have a single item appear in each of its compartments
- Each item in a rucksack has a different priority value, with a-z having 1-26, and A-Z having 27-52
- The goal seems to be:
  1. Find the duplicated item in each rucksack
  2. Determine the priority value of that duplicate item
  3. Add all the priority values together

## Part 2

- We now have groups of elves, three elves to a group
- Each group is uniquely identifiable by a badge
- The badge is the only thing that each member of a group is guaranteed to have
- It looks like badge values are also case-sensitive letters
- No one knows what the badges look like ahead of time; need to be pulled from rucksack
- Every group of three lines constitutes one elf group

### The goal

1. Process three lines of text at a time
2. Find the common element shared between all three lines
3. Find the priority value of that shared element
4. Sum all priority values
