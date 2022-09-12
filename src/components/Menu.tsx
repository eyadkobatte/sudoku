import { useStoreon } from "storeon/react";

import { Events, State } from "../store";
import styles from "./Menu.module.scss";
import { objectKeys } from "@/shared/utils/object-helpers.util";
import { DifficultyMap } from "@/shared/enums/Difficulty";

const Menu = () => {
  const { dispatch } = useStoreon<State, Events>();
  const newGameOptions = objectKeys(DifficultyMap);
  return (
    <div className={styles.container}>
      {newGameOptions.map((option, index) => (
        <a
          className={styles.link}
          key={index}
          onClick={() => dispatch("game/new", option)}
        >
          {option}
        </a>
      ))}
    </div>
  );
};

export default Menu;
