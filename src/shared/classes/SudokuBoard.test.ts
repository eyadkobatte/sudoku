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
import { EMPTY_GAME_BOARD } from "../constants/EmptyBoard";
import { Difficulty, DifficultyMap } from "../enums/Difficulty";
import { objectKeys } from "../utils/object-helpers.util";
import { SudokuBoard } from "./SudokuBoard";

describe("SudokuBoard", () => {
  let sudokuBoard: SudokuBoard;
  beforeEach(() => {
    sudokuBoard = new SudokuBoard(EMPTY_GAME_BOARD, EMPTY_GAME_BOARD);
  });

  it("should create a new class", () => {
    expect(sudokuBoard).toBeTruthy();
  });

  it("should generate a new board that is valid", () => {
    sudokuBoard.generate();
    expect(sudokuBoard.validate()).toEqual(true);
  });

  it("should have appropriate filled squares for each difficulty ", () => {
    objectKeys(DifficultyMap).forEach((key) => {
      sudokuBoard.generate(key);
      expect(sudokuBoard.validate()).toEqual(true);
      expect(
        sudokuBoard.board.flat(1).filter((value) => value !== "0").length
      ).toBeGreaterThanOrEqual(DifficultyMap[key]);
      expect(
        sudokuBoard.board.flat(1).filter((value) => value === "0").length
      ).toBeLessThanOrEqual(81 - DifficultyMap[key]);
    });
  });

  it("should return true when validating valid boards", () => {
    sudokuBoard = new SudokuBoard(validSudokuBoard1, validSudokuBoard1);
    expect(sudokuBoard.validate()).toEqual(true);

    sudokuBoard = new SudokuBoard(validSudokuBoard2, validSudokuBoard2);
    expect(sudokuBoard.validate()).toEqual(true);

    sudokuBoard = new SudokuBoard(validSudokuBoard3, validSudokuBoard3);
    expect(sudokuBoard.validate()).toEqual(true);

    sudokuBoard = new SudokuBoard(validSudokuBoard4, validSudokuBoard4);
    expect(sudokuBoard.validate()).toEqual(true);
  });

  it("should return false when validating invalid boards", () => {
    sudokuBoard = new SudokuBoard(invalidSudokuBoard1, invalidSudokuBoard1);
    expect(sudokuBoard.validate()).toEqual(false);

    sudokuBoard = new SudokuBoard(invalidSudokuBoard2, invalidSudokuBoard2);
    expect(sudokuBoard.validate()).toEqual(false);
  });

  it("should solve incomplete sudoku boards", () => {
    sudokuBoard = new SudokuBoard(
      incompleteSudokuBoard1,
      incompleteSudokuBoard1
    );
    sudokuBoard.solve();
    expect(sudokuBoard.board).toEqual(answerForIncompleteSudokuBoard1);

    sudokuBoard = new SudokuBoard(
      incompleteSudokuBoard2,
      incompleteSudokuBoard2
    );
    sudokuBoard.solve();
    expect(sudokuBoard.board).toEqual(answerForIncompleteSudokuBoard2);
  });
});
