import { VscGithubInverted } from "react-icons/vsc";
import { useAuth } from "../../hooks/useAuth";
import { useWindowDimensions } from "../../hooks/useWindowSize";
import { UserPhoto } from "../UserPhoto";

import styles from "./styles.module.scss";

export function HeaderActions() {
  const { signInUrl, user, signOut } = useAuth();
  const { width } = useWindowDimensions();

  let showLoginButton = true;

  if (width) {
    if (width < 650) {
      showLoginButton = false;
    }

    if (width > 975) {
      return <></>;
    }
  }

  return (
    <div className={styles.userPhoto}>
      {user ? (
        <div>
          <button onClick={signOut}>Sair</button>
          <UserPhoto user={user} size={40} />
        </div>
      ) : (
        showLoginButton ? (
          <a href={signInUrl}>
            <VscGithubInverted size="24" />
            ENTRAR COM GITHUB
          </a>
        ) : (
          <UserPhoto size={40} />
        )
      )}
    </div>
  );
}
