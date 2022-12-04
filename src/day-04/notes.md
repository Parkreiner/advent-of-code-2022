# Day 4

## Part 1 notes

- There are several sections on the ship that need to be clenaed up
- Each section has a unique ID
- Some of the section assignments overlap
- Each line of the file will have two assignments; each assignment will be a contiguous range of sections that a single elf needs to take care of
- Each line is formatted like `2-4,6-8`
- There are some elves for whom their assignment is fully contained within their partner's assignment
- You do not know ahead of time how high the section numbers will go - it is fully possible that some section numbers will be multiple digits

### The goal

1. Make a counter for sections with overlaps, initialized to 0
2. For each line of the file, process the line into two assignment ranges
3. Determine if there is a fully overlap between the ranges
   1. If so, increment the counter
4. At the end, log the count value

## Part 2 notes

- Not much is changing; now we just need to see where there's a partial overlap
