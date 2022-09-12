import Board from "./Board";
import Keyboard from "./Keyboard";
import Menu from "./Menu";
import DarkModeToggle from "./DarkModeToggle";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span>
          Made by{" "}
          <a href="https://eyad.dev" target="_blank" rel="noopener noreferrer">
            Eyad Kobatte
          </a>{" "}
          with the power of Caffeine
        </span>
        <DarkModeToggle />
      </header>

      <main className={styles.main}>
        <Menu></Menu>
        <Board></Board>
        <Keyboard></Keyboard>
      </main>
    </div>
  );
};

export default Home;
