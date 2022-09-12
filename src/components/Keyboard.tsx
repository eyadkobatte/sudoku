import SimpleKeyboard from "simple-keyboard";
import { KeyboardOptions } from "simple-keyboard/build/interfaces";
import "simple-keyboard/build/css/index.css";
import { useEffect, useState } from "react";

import { useStoreon } from "storeon/react";
import { Events, State } from "../store";
import styles from "./Keyboard.module.scss";

export enum KeyboardActionsEnum {
  UNDO = "{undo}",
}

const config: KeyboardOptions = {
  layout: {
    default: ["1 2 3 4 5 0", `6 7 8 9 ${KeyboardActionsEnum.UNDO}`],
  },
  display: {
    0: "⌫",
    [KeyboardActionsEnum.UNDO]: "⎌",
  },
  theme: "hg-theme-default custom-theme",
  inputName: "input",
  physicalKeyboardHighlightPress: true,
  physicalKeyboardHighlight: true,
  inputPattern: /[0-9]/,

  buttonTheme: [
    {
      class: "custom-button",
      buttons: `1 2 3 4 5 6 7 8 9 0 ${KeyboardActionsEnum.UNDO}`,
    },
  ],

  stopMouseDownPropagation: true,
  stopMouseUpPropagation: true,
  preventMouseDownDefault: true,
  preventMouseUpDefault: true,
};

const Keyboard = () => {
  // Counter will be re-render only on `state.count` changes
  const { dispatch } = useStoreon<State, Events>();

  const onKeyPress = (button: string) => {
    const validInputs = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      KeyboardActionsEnum.UNDO,
    ];

    if (validInputs.includes(button)) {
      dispatch("keyboard/pressed", button);
    }
  };

  const [simpleKeyboardOptions] = useState({ ...config, onKeyPress });

  useEffect(() => {
    const keyboard = new SimpleKeyboard(simpleKeyboardOptions);

    return () => {
      keyboard.destroy();
    };
  }, [simpleKeyboardOptions]);

  return (
    <div className={styles.container}>
      <input className="input" type="hidden" />
      <div className="simple-keyboard"></div>
    </div>
  );
};

export default Keyboard;
