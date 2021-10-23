import { ReactNode } from "react";
import { useWindowDimensions } from "../../hooks/useWindowSize";

import styles from "./styles.module.scss";

interface AsideProps {
  children: ReactNode;
}

export function Aside({ children }: AsideProps) {
  const { width } = useWindowDimensions();

  let hideChildren = false;

  if (width) {
    if (width > 975) {
      hideChildren = true;
    }

    if (width < 650) {
      return <></>;
    }
  }

  return (
    <div className={styles.asideContainer}>
      <>{hideChildren ? children : <div className={styles.banner}></div>}</>
    </div>
  );
}
