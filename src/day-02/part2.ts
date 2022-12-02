import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.resolve(__dirname, "./input.txt");

const choices = ["rock", "paper", "scissors"] as const;
const outcomes = ["win", "draw", "lose"] as const;
const opponentChars = ["A", "B", "C"] as const;
const outcomeChars = ["X", "Y", "Z"] as const;

type Choice = typeof choices[number];
type Outcome = typeof outcomes[number];
type OpponentChar = typeof opponentChars[number];
type OutcomeChar = typeof outcomeChars[number];

const opponentAliases: Readonly<Record<OpponentChar, Choice>> = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

const outcomeAliases: Readonly<Record<OutcomeChar, Outcome>> = {
  X: "lose",
  Y: "draw",
  Z: "win",
};

const choiceValues: Readonly<Record<Choice, number>> = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const roundValues: Readonly<Record<Outcome, number>> = {
  win: 6,
  draw: 3,
  lose: 0,
};

function assertOpponentChar(input: unknown): asserts input is OpponentChar {
  const found = opponentChars.includes(input as OpponentChar);
  if (!found) {
    throw new Error(`Value ${input} is not a valid play`);
  }
}

function assertOutcomeChar(input: unknown): asserts input is OutcomeChar {
  const found = outcomeChars.includes(input as OutcomeChar);
  if (!found) {
    throw new Error(`Value ${input} is not a valid outcome`);
  }
}

function calcRoundScore(opponentChoice: Choice, outcome: Outcome): number {
  let choicePoints: number;
  if (outcome === "win") {
    choicePoints = 1 + (choiceValues[opponentChoice] % choices.length);
  } else if (outcome === "draw") {
    choicePoints = choiceValues[opponentChoice];
  } else {
    choicePoints = choiceValues[opponentChoice] - 1;
    if (choicePoints <= 0) choicePoints = choices.length;
  }

  return roundValues[outcome] + choicePoints;
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

  const [opponentChar, outcomeChar] = chars;
  assertOpponentChar(opponentChar);
  assertOutcomeChar(outcomeChar);

  console.log({
    lineNum,
    opponentChar,
    opponentChoice: opponentAliases[opponentChar],
    outcomeChar,
    neededOutcome: outcomeAliases[outcomeChar],
    points: calcRoundScore(
      opponentAliases[opponentChar],
      outcomeAliases[outcomeChar]
    ),
  });

  yourScore += calcRoundScore(
    opponentAliases[opponentChar],
    outcomeAliases[outcomeChar]
  );
}

console.log(
  `Your final score after processing ${lineNum} lines is ${yourScore}`
);
