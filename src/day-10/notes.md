# Day 10

## Part 1 notes

- Need to make a replacement for video device
  - Using clock circuit that ticks in cycles
- Need to figure out CPU cycles
- CPU has two instructions, and starts at a value of 1
  - addx takes two cycles and adds a value
  - noop takes one cycle and does nothing
- Cycles can overlap?
- Might be useful to focus mainly on these cycles:
  - Cycle 20
  - Cycles after 20 that are multiples of 40
- The total signal strength is determined by the cycle number multiplied by the current signal value
- Goal is to find the total signal strength, considering these stop points:
  1.  20
  2.  60
  3.  100
  4.  140
  5.  180
  6.  220

### Part 1 strategy

1. Parse the input file into individual lines
2. Create an array of stop points (could even be a set)
3. Create two signal strength values (both initialized to zero):
   - Total signal strength
   - Current base signal strength
4. Flap-map each line into a set of cycle instructions
   1. Turn each noop into a 0
   2. Turn each `addx` into a [0, `addx value`]
5. For each line of the flap-mapped instructions:
   1. If the line matches up with a stop point:
      1. Take the stop point's 1-indexed value and multiply it by the signal strength, and then add it to the total strength
   2. Add the instruction value to the current base strength
6. Log the final total signal strength

#### Main function info

Input: Array of strings (the original text file lines)
Output: number

## Part 2 notes

### General notes

- The values actually correspond to the horizontal position a sprite that is 3 pixels wide
- The value changes the position of the middle of the sprite
  - vertical positioning doesn't exist
- We're drawing to a CRT that is 40 x 6
  - Each row is drawn to line-by-line
  - All positions are 0-indexed
- Only able to draw a single pixel per clock cycle
- If the pixel that the CRT is drawing matches up with the position of our sprite, then we get a lit pixel (`#`). Otherwise, darkness (`.`)
- Basically, two processes are going on each cycle:
  1. The sprite may or may not change position
  2. The CRT does a scan on its current position to determine what it should draw
- By the time all 240 cyles happen, there should be a set of letters displayed to the screen; we need to determine what eight letters those are

### Part 2 strategy

1. Parse the input file into individual lines
2. Create an array of stop points (could even be a set)
3. Create a
4. Flap-map each line into a set of cycle instructions
   1. Turn each noop into a 0
   2. Turn each `addx` into a [0, `addx value`]
5. For each line of the flap-mapped instructions:
   1. If the line matches up with a stop point:
      1. Take the stop point's 1-indexed value and multiply it by the signal strength, and then add it to the total strength
   2. Add the instruction value to the current base strength
6. Log the final total signal strength
