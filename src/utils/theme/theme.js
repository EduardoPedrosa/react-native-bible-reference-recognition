import { DefaultTheme as PaperDefaultTheme } from "react-native-paper"

import colors from "./colors"

import { DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native"

const paperTheme = {
  ...PaperDefaultTheme,
  roundness: 8,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: colors.primary,
    accent: colors.accent,
    background: colors.background,
    error: colors.error,
    text: colors.primaryText,
  },
}

const navigationTheme = {
  ...NavigationDefaultTheme,
  dark: false,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.white,
    text: colors.primaryText,
    border: colors.lightText,
    notification: colors.accent,
  },
}

const combinedDefaultTheme = {
  ...paperTheme,
  ...navigationTheme,
  colors: {
    ...paperTheme.colors,
    ...navigationTheme.colors,
  },
}

export default combinedDefaultTheme
