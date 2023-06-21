import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  // base colors
  primary: "rgb(10, 132, 255)",
  background: "rgb(1, 1, 1)",
  card: "rgb(18, 18, 18)",
  text: "rgb(229, 229, 231)",
  border: "rgb(39, 39, 41)",
  notification: "rgb(255, 69, 58)",

  // colors
  black: "#1E1F20",
  white: "#FFFFFF",
  lightGray: "#ABAFB8",
  lightGray2: "#EFEFF0",
  lightGray3: "#D4D5D6",
  tomato: "tomato",
};

export const SIZES = {
  // global sizes
  base: 10,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontFamily: "Roboto-Black",
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 24 },
  h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 20 },
  body1: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body3,
    lineHeight: 24,
  },
  body4: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body4,
    lineHeight: 20,
  },
};

export const STYLES = {
  errorText: {
    color: "tomatto",
    ...FONTS.body3,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
};
const appTheme = { COLORS, SIZES, FONTS, STYLES };

export default appTheme;
