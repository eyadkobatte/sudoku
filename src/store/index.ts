import { createStoreon, StoreonModule } from "storeon";
import { storeonLogger } from "storeon/devtools";
import { persistState } from "@storeon/localstorage";

import { SudokuBoard } from "@/shared/classes/SudokuBoard";
import { Difficulty } from "@/shared/enums/Difficulty";
import { EMPTY_GAME_BOARD } from "@/shared/constants/EmptyBoard";
import { KeyboardActionsEnum } from "@/components/Keyboard";
import { HistoryStore } from "@/shared/classes/History/HistoryStore";

export type State = {
  keyPressed: string;
  row: number;
  column: number;
  board: SudokuBoard;
  boardHistory: HistoryStore<SudokuBoard>;
};

export type Events = {
  "keyboard/pressed": string;
  "cell/selected": { row: number; column: number };
  "board/update": string;
  "board/undo": void;
  "game/new": Difficulty;
  "game/checkIsSolved": void;
  "game/solve": void;
  "game/complete": void;
};

const keyPressedStore: StoreonModule<State, Events> = (store) => {
  store.on("@init", () => ({ keyPressed: "" }));
  store.on("keyboard/pressed", ({}, key) => {
    store.dispatch("board/update", key);
    return { keyPressed: key };
  });
};

const cellSelectedStore: StoreonModule<State, Events> = (store) => {
  store.on("@init", () => ({ row: -1, column: -1 }));
  store.on("cell/selected", ({}, { row, column }) => ({ row, column }));
};

const boardStore: StoreonModule<State, Events> = (store) => {
  store.on("@init", () => {
    const sudokuBoard = new SudokuBoard(EMPTY_GAME_BOARD, EMPTY_GAME_BOARD);
    sudokuBoard.generate();
    return {
      board: sudokuBoard,
    };
  });
  store.on("board/update", ({ board: sudokuBoard, boardHistory }, key) => {
    if (key === KeyboardActionsEnum.UNDO) {
      store.dispatch("board/undo");
    } else {
      const { row, column } = store.get();
      if (row === -1 && column === -1) {
        return;
      }
      boardHistory.add(sudokuBoard.getState());
      sudokuBoard.update(row, column, key);
    }
    return { board: sudokuBoard, boardHistory };
  });

  store.on("board/undo", ({ board: sudokuBoard, boardHistory }) => {
    const state = boardHistory.pop();
    if (state) {
      sudokuBoard.setFromState(state);
    }
    return {
      board: sudokuBoard,
      boardHistory,
    };
  });

  store.on("@changed", () => {
    store.dispatch("game/checkIsSolved");
  });
};

const boardHistoryStore: StoreonModule<State, Events> = (store) => {
  store.on("@init", () => {
    const history = new HistoryStore<SudokuBoard>([]);
    return {
      boardHistory: history,
    };
  });
};

const gameStore: StoreonModule<State, Events> = (store) => {
  store.on("game/new", ({ board: sudokuBoard }, difficulty) => {
    sudokuBoard.generate(difficulty);
    return {
      board: sudokuBoard,
    };
  });
  store.on("game/solve", ({ board: sudokuBoard }) => {
    sudokuBoard.solve();
    return {
      board: sudokuBoard,
    };
  });
  store.on("game/checkIsSolved", ({ board: sudokuBoard }) => {
    const isSolved = sudokuBoard.isSolved();
    if (isSolved) {
      store.dispatch("game/complete");
    }
  });
};

export const store = createStoreon<State, Events>([
  boardHistoryStore,
  boardStore,
  cellSelectedStore,
  gameStore,
  keyPressedStore,
  process.env.NODE_ENV !== "production" && storeonLogger,
  persistState(["board"], {
    deserializer: (data) => {
      const parsed = JSON.parse(data);
      const sudokuBoard = new SudokuBoard(
        parsed.board.board,
        parsed.board.initialBoard
      );
      return { board: sudokuBoard };
    },
  }),
]);
