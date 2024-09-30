import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    minWidth: '70%',
    backgroundColor: colors.cardBackgroundColor,
    shadowColor: colors.cardShadowColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 10,
    padding: 20,
    //justifyContent: 'center',
    alignSelf: 'center',
  },
});