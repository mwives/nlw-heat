import React, { useState } from "react";
import { Alert, Keyboard, TextInput, View } from "react-native";

import { Button } from "../Button";
import { api } from "../../services/api";
import { COLORS } from "../../theme";

import { styles } from "./styles";

export function SendMessageForm() {
  const [message, setMessage] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  async function handleSendMessage() {
    try {
      const formattedMessage = message.trim() ;

      if (formattedMessage.length < 0) {
        Alert.alert("Escreva a mensagem para enviar.");
      }

      setIsSendingMessage(true);

      await api.post("/messages", { message: formattedMessage });

      setMessage("");
      setIsSendingMessage(false);

      Keyboard.dismiss();
      Alert.alert("Mensagem enviada com sucesso!")
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Qual sua expectativa para o evento?"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        keyboardAppearance="dark"
        editable={!isSendingMessage}
        value={message}
        onChangeText={setMessage}
        style={styles.input}
      />
      <Button
        text="ENVIAR MENSAGEM"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        isLoading={isSendingMessage}
        onPress={handleSendMessage}
      />
    </View>
  );
}
