import logoImg from "../../assets/logo.svg";
import { HeaderActions } from "../HeaderActions";

import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <img src={logoImg} alt="DoWhile 2021" />
      <HeaderActions />
    </header>
  );
}
