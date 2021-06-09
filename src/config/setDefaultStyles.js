import { setCustomText } from "react-native-global-props"

export default () => {
  const customTextProps = {
    style: {
      fontFamily: "Raleway-Regular",
    },
  }
  setCustomText(customTextProps)
}
