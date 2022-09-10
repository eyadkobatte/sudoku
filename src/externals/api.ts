import zip from "lodash/zip";

import { library } from "./_library";
import { Difficulty, DifficultyMap } from "@/shared/enums/Difficulty";
import { Board } from "@/shared/types/Board";

const isString = (value: any): value is string => {
  return (value as string).replace !== undefined;
};

const transpose = (board: Board): Board => {
  return zip(...board) as Board;
};

const getNumberOccurenceCount = (setOfNumbers: string[]) => {
  const map = new Map<string, number>();
  setOfNumbers.forEach((value) => map.set(value, (map.get(value) || 0) + 1));
  return map;
};

const doesSetHaveMoreThanOneOccurence = (
  occurenceMap: Map<string, number>
): boolean => {
  let hasMoreThanOne = false;
  occurenceMap.forEach((value) => {
    if (value > 1) {
      hasMoreThanOne = true;
    }
  });
  return hasMoreThanOne;
};

export const generate = (difficulty: Difficulty): Board => {
  return library.board_string_to_grid(
    library.generate(DifficultyMap[difficulty], true)
  );
};

export const solve = (board: Board): Board => {
  try {
    const solved = library.solve(library.board_grid_to_string(board), false);
    if (!solved) {
      throw new Error("Cannot solve board");
    }
    return library.board_string_to_grid(solved);
  } catch (error: unknown) {
    if (isString(error)) {
      throw new Error(error);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Could not solve board");
  }
};

export const validate = (board: Board): boolean => {
  const hasAllValidNumbers = board
    .flat(1)
    .map((value) => Number.parseInt(value, 10))
    .every((value) => value >= 0 && value <= 9);
  if (!hasAllValidNumbers) {
    return false;
  }
  // Check if each row does not have duplicates
  const hasAllValidRows = board
    .map((row) =>
      doesSetHaveMoreThanOneOccurence(
        getNumberOccurenceCount(row.filter((value) => value !== "0"))
      )
    )
    .every((value) => !value);
  if (!hasAllValidRows) {
    return false;
  }

  // Check if each column does not have duplicates
  const hasAllValidColumns = transpose(board)
    .map((row) =>
      doesSetHaveMoreThanOneOccurence(
        getNumberOccurenceCount(row.filter((value) => value !== "0"))
      )
    )
    .every((value) => !value);
  if (!hasAllValidColumns) {
    return false;
  }

  return true;
};
