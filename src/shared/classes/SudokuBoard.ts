import { generate, solve, validate } from "@/externals/api";

import { Difficulty } from "@/shared/enums/Difficulty";
import { Board } from "@/shared/types/Board";
import { EMPTY_GAME_BOARD } from "@/shared/constants/EmptyBoard";

export interface SudokuBoard {
  board: Board;

  generate(difficulty: Difficulty): Board;
  solve(board: Board): Board;
  validate(board: Board): boolean;
}

export class SudokuBoard {
  board: Board = EMPTY_GAME_BOARD;

  public generate(difficulty: Difficulty = Difficulty.EASY): Board {
    this.board = generate(difficulty);
    return this.board;
  }

  public solve(board: Board): Board {
    return solve(board);
  }

  public validate(board: Board): boolean {
    return validate(board);
  }
}
