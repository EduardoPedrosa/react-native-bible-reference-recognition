import { DefaultTheme } from "react-native-paper"

import colors from "./colors"

const theme = {
  ...DefaultTheme,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.accent,
    background: colors.background,
    error: colors.error,
    text: colors.primaryText,
  },
}

export default theme
