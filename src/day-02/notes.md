# Advent of Code – Day 2

## Part 1 notes

- We're playing standard RPS
- We have an encrypted strategy guide
  - A stands for Rock, B is paper, C is scissors
  - There's an _assumption_ that X is rock, Y is paper, Z is scissors. The reason that the pairs aren't consistent is to avoid being suspicious by always winning, maybe?
- The winner is decided solely by the highest score
  - Different shapes have different values; 1 for rock, 2 for paper, 3 for scissors
  - These values get added to the value of the outcome of the game – 0 if you lose, 3 if a draw, 6 if you win
- The goal of part 1 is just to determine what the score would be if our assumptions about X, Y, and Z are correct

## Part 2 notes

- One change:
  - We know that A, B, and C are still treated the same
  - Now we know that X stands for win, Y for draw, Z for lose
