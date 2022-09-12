import { HistoryState } from "./History/HistoryState";
import { generate, solve, validate } from "@/externals/api";

import { Difficulty } from "@/shared/enums/Difficulty";
import { Board } from "@/shared/types/Board";
import { EMPTY_GAME_BOARD } from "@/shared/constants/EmptyBoard";

export interface SudokuBoard {
  board: Board;
  initialBoard: Board;

  setFromState(state: HistoryState<SudokuBoard>): void;
  getState(): HistoryState<SudokuBoard>;

  generate(difficulty: Difficulty): void;
  solve(): void;
  validate(): boolean;
  update(row: number, column: number, value: string): Board;
  isSolved(): void;
}

export class SudokuBoard {
  board: Board = EMPTY_GAME_BOARD;
  initialBoard: Board = EMPTY_GAME_BOARD;

  constructor(board: Board = EMPTY_GAME_BOARD, initialBoard: Board) {
    this.board = JSON.parse(JSON.stringify(board));
    this.initialBoard = JSON.parse(JSON.stringify(initialBoard));
  }

  setFromState(state: HistoryState<SudokuBoard>): void {
    this.board = state.getState().board;
    this.initialBoard = state.getState().initialBoard;
  }

  getState() {
    return new HistoryState<SudokuBoard>(
      new SudokuBoard(this.board, this.initialBoard)
    );
  }

  public generate(difficulty: Difficulty = Difficulty.EASY): void {
    this.board = generate(difficulty);
    this.initialBoard = this.board.map((row) => row.map((value) => value));
  }

  public solve(): void {
    this.board = solve(this.initialBoard);
  }

  public validate(): boolean {
    return validate(this.board);
  }

  private validateNumber(value: string) {
    const numericValue = Number.parseInt(value, 10);
    if (numericValue >= 0 && numericValue <= 9) {
      return true;
    }
    return false;
  }

  public update(row: number, column: number, value: string): Board {
    if (this.validateNumber(value)) {
      this.board[row][column] = value;
    }
    return this.board;
  }

  public isSolved() {
    const board = this.board;
    const solved = solve(this.initialBoard);
    if (JSON.stringify(board) === JSON.stringify(solved)) {
      return true;
    }
    return false;
  }

  public toString() {
    return JSON.stringify({
      board: this.board,
      initialBoard: this.initialBoard,
    });
  }
}
