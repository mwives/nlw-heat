import { AntDesign } from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import {
  ActivityIndicator,
  ColorValue,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import { styles } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  icon?: ComponentProps<typeof AntDesign>["name"];
  color: ColorValue;
  backgroundColor: ColorValue;
  isLoading?: boolean;
}

export function Button({
  text,
  icon,
  color,
  backgroundColor,
  isLoading = false,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isLoading}
      style={[styles.button, { backgroundColor }]}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={color} />
      ) : (
        <>
          <AntDesign name={icon} size={24} style={styles.icon} />
          <Text style={[styles.text, { color }]}>{text}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
