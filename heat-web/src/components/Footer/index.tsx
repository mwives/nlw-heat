import { FormEvent, useState } from "react";
import { VscGithubInverted } from "react-icons/vsc";

import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { useWindowDimensions } from "../../hooks/useWindowSize";
import { api } from "../../services/api";

import styles from "./styles.module.scss";

export function Footer() {
  const [message, setMessage] = useState("");

  const { signInUrl, user } = useAuth();
  const { toast, toastConfigs } = useToast();
  const { width } = useWindowDimensions();

  async function createMessage() {
    try {
      await api.post("messages", { message });

      setMessage("");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleCreateMessage(e: FormEvent) {
    e.preventDefault();

    if (message.trim()) {
      await toast.promise(
        createMessage(),
        {
          pending: "Enviando mensagem...",
          success: "Mensagem enviada!",
          error: "Erro ao enviar mensagem",
        },
        toastConfigs
      );
    }
  }

  if (width) {
    if (width > 650) {
      return <></>;
    }
  }

  return (
    <div className={styles.footer}>
      {user ? (
        <form onSubmit={handleCreateMessage}>
          <textarea
            name="message"
            id="message"
            placeholder="Qual sua expectativa para o evento?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button type="submit">ENVIAR MENSAGEM</button>
        </form>
      ) : (
        <a href={signInUrl}>
          <VscGithubInverted size="24" />
          Entrar com GitHub
        </a>
      )}
    </div>
  );
}
