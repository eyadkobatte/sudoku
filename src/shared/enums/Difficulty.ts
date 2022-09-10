export enum Difficulty {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
}

export const DifficultyMap = {
  [Difficulty.EASY]: 61,
  [Difficulty.MEDIUM]: 43,
  [Difficulty.HARD]: 25,
} as const;
