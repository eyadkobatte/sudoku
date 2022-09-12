import { useEffect, useState } from "react";
import useDarkMode from "use-dark-mode";
import styles from "./DarkModeToggle.module.scss";

const DarkModeToggle = () => {
  const darkMode = useDarkMode(true, {});

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // prevents ssr flash for mismatched dark mode
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}></div>;
  }

  return (
    <button
      className={styles.darkModeButton}
      type="button"
      onClick={darkMode.toggle}
    >
      {darkMode.value ? "☀" : "☾"}
    </button>
  );
};

export default DarkModeToggle;
