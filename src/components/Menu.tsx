import { useStoreon } from "storeon/react";
import { track } from "@panelbear/panelbear-js";

import { Events, State } from "../store";
import styles from "./Menu.module.scss";
import { objectKeys } from "@/shared/utils/object-helpers.util";
import { Difficulty, DifficultyMap } from "@/shared/enums/Difficulty";

const Menu = () => {
  const { dispatch } = useStoreon<State, Events>();
  const newGameOptions = objectKeys(DifficultyMap);

  const handleNewGame = (option: Difficulty) => {
    track(`NewGame${option}`);
    dispatch("game/new", option);
  };

  return (
    <div className={styles.container}>
      {newGameOptions.map((option, index) => (
        <a
          className={styles.link}
          key={index}
          onClick={() => handleNewGame(option)}
        >
          {option}
        </a>
      ))}
    </div>
  );
};

export default Menu;
