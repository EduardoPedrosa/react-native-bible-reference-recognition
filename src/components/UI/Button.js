import React, { Component } from "react"
import { View, StyleSheet, Button } from "react-native"

const styles = StyleSheet.create({})

class CustomButton extends Component {
  render() {
    const { onPress, children } = this.props
    return <Button onPress={onPress}>{children}</Button>
  }
}

export default CustomButton
