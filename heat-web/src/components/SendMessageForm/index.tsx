import { FormEvent, useState } from "react";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";

import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { api } from "../../services/api";
import { UserPhoto } from "../UserPhoto";

import styles from "./styles.module.scss";

export function SendMessageForm() {
  const { user, signOut } = useAuth();
  const { toast, toastConfigs } = useToast();
  const [message, setMessage] = useState("");

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

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={signOut}>
        <VscSignOut size={32} />
      </button>

      <header className={styles.userInfo}>
        <UserPhoto user={user} size={94} />
        <strong>{user?.name}</strong>
        <span>
          <VscGithubInverted size={16} />
          {user?.login}
        </span>
      </header>

      <form className={styles.sendMessageForm} onSubmit={handleCreateMessage}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual sua expectativa para o evento?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  );
}
