import { useEffect, useState } from "react";
import io from "socket.io-client";

import { api } from "../../services/api";
import { UserPhoto } from "../UserPhoto";

import styles from "./styles.module.scss";

interface Message {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const messagesQueue: Message[] = [];

const socket = io(String(api.defaults.baseURL));

socket.on("new_message", (newMessage: Message) => {
  messagesQueue.push(newMessage);
});

export function MessagesList() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const { data } = await api.get<Message[]>("messages/last3");
        setMessages(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchMessages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages((prevMessages) =>
          [messagesQueue[0], prevMessages[0], prevMessages[1]].filter(Boolean)
        );

        messagesQueue.shift();
      }
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <ul className={styles.messagesList}>
      {messages.map(({ id, text, user }) => (
        <li key={id}>
          <p>{text}</p>
          <div>
            <UserPhoto user={user} />
            <span>{user.name}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
