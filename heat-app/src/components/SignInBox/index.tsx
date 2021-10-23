import React from "react";
import { View } from "react-native";

import { Button } from "../Button";
import { useAuth } from "../../hooks/useAuth";
import { COLORS } from "../../theme";

import { styles } from "./styles";

export function SignInBox() {
  const { signIn, isSigningIn } = useAuth();

  return (
    <View style={styles.container}>
      <Button
        text="ENTRAR COM O GITHUB"
        icon="github"
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        isLoading={isSigningIn}
        onPress={signIn}
      />
    </View>
  );
}
