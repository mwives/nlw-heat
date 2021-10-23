import { VscGithubInverted } from "react-icons/vsc";
import { useAuth } from "../../hooks/useAuth";
import { useWindowDimensions } from "../../hooks/useWindowSize";

import styles from "./styles.module.scss";

export function LoginBox() {
  const { signInUrl } = useAuth();
  const { width } = useWindowDimensions();

  let isLargeScreen = false;

  if (width && width > 975) {
    isLargeScreen = true;
  }

  return (
    <div className={styles.loginBoxWrapper}>
      {isLargeScreen && (
        <>
          <strong>Entre e compartilhe a sua mensagem</strong>
          <a href={signInUrl}>
            <VscGithubInverted size="24" />
            Entrar com GitHub
          </a>
        </>
      )}
    </div>
  );
}
