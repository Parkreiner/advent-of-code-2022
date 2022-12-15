# Day 9

## Part 1 notes

- We're working with rope physics; we're trying to figure out where not to step on a bridge
- Every rope will have a knot at each end, marking the head and the tail
  - It seems they have a fixed distance between them; moving the head will cause the tail to shift to keep up, and vice-versa
- The ropes are being mapped to a 2-D grid via Planck lengths
- Input consists of a series of movements for the head; I need to figure out how the tail will react to the movements
- Head and tail must always be touching (overlap or touch each other diagonally)
- Head and tail must never be more than two spaces apart
- If the head and tail are diagonal to each other, the tail will always move diagonal after the head moves, so that they are either vertical or horizontal
- I can assume that head and tail will always be overlapping at the start
- Head movements will be provided as a series of text lines, where each line indicates the direcion, as well as the number of steps
  - Only have to worry about horizontal and vertical directions for the head
- May or may not to update the tail position after each individual step
- Again: only need to bother moving the tail if it would no longer be adjacent to the head
- The goal here is to count the total number of spaces that the tail visits at least once
- The puzzle input doesn't have this, but I think it's safe to assume that the field will be a 5x5 grid
  - Seems like head and tail might start in the bottom-left corner

### Steps

1. Initialize a 5x5 grid of objects, where each object has the following properties:

   - hasHead (boolean)
   - hasTail (boolean)
   - visited (boolean)

2. Update the bottom-left object to set all properties to true
3. For each line of input:
   1. Parse out the direction and the number of steps
   2. For each step:
      1. Move the head in the specified direction, updating the hasHead properties for both the previous space and the new one
      2. If the tail would no longer be adjacent:
         1. Move the tail so that it is adjacent, updating the hasTail/visited properties of both the previous and new spaces
4. Iterate through the grid, counting up the number of objects where the visited property is true.
