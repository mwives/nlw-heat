import { StyleSheet } from "react-native";

import { COLORS, FONTS } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    marginRight: 20,
    color: COLORS.WHITE,
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
  },
});
