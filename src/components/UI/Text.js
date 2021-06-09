import React, { Component } from "react"
import { StyleSheet, Text } from "react-native"

const styles = StyleSheet.create({
  text: {
    fontFamily: "Raleway-Regular",
  },
  bold: {
    fontFamily: "Raleway-Bold",
  },
  thin: {
    fontFamily: "Raleway-Thin",
  },
})

class CustomText extends Component {
  render() {
    const { style, children, fontWeight, ...rest } = this.props
    const fontWeightStyle = fontWeight ? styles[fontWeight] : null
    return (
      <Text style={[styles.text, style, fontWeightStyle]} {...rest}>
        {children}
      </Text>
    )
  }
}

export default CustomText
