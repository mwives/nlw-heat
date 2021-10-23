import { StyleSheet } from 'react-native';

import { COLORS, FONTS } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 36,
  },
  message: {
    marginBottom: 12,
    color: COLORS.WHITE,
    lineHeight: 20,
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
  },
  footer : {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  userName: {
    marginLeft: 16,
    color: COLORS.WHITE,
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
  },
});