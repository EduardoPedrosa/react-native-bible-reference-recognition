import React, { Component } from "react"
import { View, StyleSheet, ActivityIndicator } from "react-native"

import colors from "@utils/theme/colors"

const styles = StyleSheet.create({
  root: {
    marginVertical: 16,
  },
})

class CustomActivityIndicator extends Component {
  render() {
    return (
      <View style={styles.root}>
        <ActivityIndicator color={colors.primary} size={50} />
      </View>
    )
  }
}

export default CustomActivityIndicator
