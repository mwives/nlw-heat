import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { io } from "socket.io-client";

import { Message } from "../Message";
import { api } from "../../services/api";
import { MESSAGES_EXAMPLE } from "../../utils/messages";

import { styles } from "./styles";

interface Message {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

let messagesQueue: Message[] = MESSAGES_EXAMPLE;

const socket = io(String(api.defaults.baseURL));

socket.on("new_message", (newMessage) => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const { data } = await api.get<Message[]>("/messages/last3");
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
        setMessages((prevMessages) => [
          messagesQueue[0],
          prevMessages[0],
          prevMessages[1],
        ]);

        messagesQueue.shift();
      }
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {messages.map((message) => (
        <Message key={message.id} data={message} />
      ))}
    </ScrollView>
  );
}
