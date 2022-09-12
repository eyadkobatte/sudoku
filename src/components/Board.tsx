import { useEffect, useState } from "react";
import { useStoreon } from "storeon/react";

import styles from "./Board.module.scss";
import { GRID_AREA } from "@/shared/constants/grid-area.map";
import { Events, State } from "@/store/index";

const Board = () => {
  const { dispatch, board, row, column } = useStoreon<State, Events>(
    "board",
    "row",
    "column"
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={styles.container}>
      {mounted &&
        board.board.map((boardRow, rowIndex) =>
          boardRow.map((value, columnIndex) => (
            <div
              className={`
              ${styles.cell}
              grid-${GRID_AREA.get(`${rowIndex}${columnIndex}`)}
              ${row === rowIndex && styles.selectedRow}
              ${column === columnIndex && styles.selectedColumn}`}
              key={`${rowIndex}${columnIndex}`}
              data-row={rowIndex}
              data-column={columnIndex}
              tabIndex={0}
              onFocus={() =>
                dispatch("cell/selected", {
                  row: rowIndex,
                  column: columnIndex,
                })
              }
              onBlur={() => dispatch("cell/selected", { row: -1, column: -1 })}
            >
              {Number.parseInt(value, 10) > 0 ? value : " "}
            </div>
          ))
        )}
    </div>
  );
};

export default Board;
