import { ToastContainer } from "react-toastify";

import { Aside } from "./components/Aside";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { LoginBox } from "./components/LoginBox";
import { MessagesList } from "./components/MessagesList";
import { SendMessageForm } from "./components/SendMessageForm";

import { useAuth } from "./hooks/useAuth";

import styles from "./App.module.scss";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  const { user } = useAuth();

  return (
    <main
      className={`${styles.contentWrapper} ${!!user && styles.contentSigned}`}
    >
      <Header />
      <MessagesList />
      <Aside>{!!user ? <SendMessageForm /> : <LoginBox />}</Aside>
      <Footer />

      <ToastContainer />
    </main>
  );
}
