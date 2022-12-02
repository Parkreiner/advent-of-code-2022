import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.resolve(__dirname, "./input.txt");

const plays = ["rock", "paper", "scissors"] as const;
const opponentChars = ["A", "B", "C"] as const;
const yourChars = ["X", "Y", "Z"] as const;

type Play = typeof plays[number];
type OpponentChar = typeof opponentChars[number];
type YourChar = typeof yourChars[number];
type PlayerChar = OpponentChar | YourChar;
type Outcome = keyof typeof roundValues;

const aliases: Readonly<Record<PlayerChar, Play>> = {
  A: "rock",
  B: "paper",
  C: "scissors",
  X: "rock",
  Y: "paper",
  Z: "scissors",
};

const choiceValues: Readonly<Record<Play, number>> = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const roundValues = {
  win: 6,
  draw: 3,
  lose: 0,
} as const;

function assertPlayerChar(input: unknown): asserts input is PlayerChar {
  const found =
    yourChars.includes(input as YourChar) ||
    opponentChars.includes(input as OpponentChar);

  if (!found) {
    throw new Error(`Value ${input} is not a valid play`);
  }
}

function calcRoundScore(opponentPlay: Play, yourPlay: Play): number {
  const oppChoicePoints = choiceValues[opponentPlay];
  const yourChoicePoints = choiceValues[yourPlay];

  const youWin =
    (yourChoicePoints > oppChoicePoints ||
      (yourPlay === "rock" && opponentPlay === "scissors")) &&
    !(yourPlay === "scissors" && opponentPlay === "rock");

  let outcome: Outcome;
  if (youWin) {
    outcome = "win";
  } else if (yourChoicePoints === oppChoicePoints) {
    outcome = "draw";
  } else {
    outcome = "lose";
  }

  return roundValues[outcome] + yourChoicePoints;
}

const lines = readline.createInterface({
  input: fs.createReadStream(filePath),
  terminal: false,
});

let yourScore = 0;
let lineNum = 0;
for await (const line of lines) {
  lineNum++;
  if (!line) continue;

  const chars = line.split(" ");
  if (chars.length !== 2) {
    throw new Error(`Input "${line}" on line no. ${lineNum} is malformed`);
  }

  const [opponentChar, yourChar] = chars;
  assertPlayerChar(opponentChar);
  assertPlayerChar(yourChar);

  yourScore += calcRoundScore(aliases[opponentChar], aliases[yourChar]);
}

console.log(
  `Your final score after processing ${lineNum} lines is ${yourScore}`
);
