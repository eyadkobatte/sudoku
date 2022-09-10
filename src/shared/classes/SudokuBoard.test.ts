import {
  answerForIncompleteSudokuBoard1,
  answerForIncompleteSudokuBoard2,
  incompleteSudokuBoard1,
  incompleteSudokuBoard2,
  invalidSudokuBoard1,
  invalidSudokuBoard2,
  validSudokuBoard1,
  validSudokuBoard2,
  validSudokuBoard3,
  validSudokuBoard4,
} from "../../../tests/fixtures/board-fixtures";
import { Difficulty, DifficultyMap } from "../enums/Difficulty";
import { objectKeys } from "../utils/object-keys.util";
import { SudokuBoard } from "./SudokuBoard";

describe("SudokuBoard", () => {
  let sudokuBoard: SudokuBoard;
  beforeEach(() => {
    sudokuBoard = new SudokuBoard();
  });

  it("should create a new class", () => {
    expect(sudokuBoard).toBeTruthy();
  });

  it("should generate a new board that is valid", () => {
    const board = sudokuBoard.generate();
    expect(sudokuBoard.validate(board)).toEqual(true);
  });

  it("should have appropriate filled squares for each difficulty ", () => {
    objectKeys(DifficultyMap).forEach((key) => {
      const board = sudokuBoard.generate(key);
      expect(sudokuBoard.validate(board)).toEqual(true);
      expect(
        board.flat(1).filter((value) => value !== "0").length
      ).toBeGreaterThanOrEqual(DifficultyMap[key]);
    });
  });

  it("should return true when validating valid boards", () => {
    expect(sudokuBoard.validate(validSudokuBoard1)).toEqual(true);
    expect(sudokuBoard.validate(validSudokuBoard2)).toEqual(true);
    expect(sudokuBoard.validate(validSudokuBoard3)).toEqual(true);
    expect(sudokuBoard.validate(validSudokuBoard4)).toEqual(true);
  });

  it("should return false when validating invalid boards", () => {
    expect(sudokuBoard.validate(invalidSudokuBoard1)).toEqual(false);
    expect(sudokuBoard.validate(invalidSudokuBoard2)).toEqual(false);
  });

  it("should solve incomplete sudoku boards", () => {
    expect(sudokuBoard.solve(incompleteSudokuBoard1)).toEqual(
      answerForIncompleteSudokuBoard1
    );
    expect(sudokuBoard.solve(incompleteSudokuBoard2)).toEqual(
      answerForIncompleteSudokuBoard2
    );
  });
});
