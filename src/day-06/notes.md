# Day 6

## Part 1 notes

- We have some kind of communication device; it's malfunctionining
- Need to determine the elves' signal
  - Signals seem random
  - Received one at a time
  - Need to be able to identify the start of a packet
    - The start is denoted by four characters that are all different

### Part 1 approach

1. Read in the file as a whole
2. Create a variable for storing the index position; initialize it with a value of 4 (because that's the smallest possible value, given the window size)
3. Create a four-character sliding window that begins at the very start of the buffer
4. While the window has not hit the end of the buffer
   1. Scan all characters in the window
   2. If the characters are all unique:
      1. Break
   3. Otherwise:
      1. Slide the window by one
      2. Increment the index
      3. Continue
5. Log the index
