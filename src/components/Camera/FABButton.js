import React, { Component } from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import { FAB } from "react-native-paper"

const { height: HEIGHT } = Dimensions.get("window")

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    bottom: HEIGHT * 0.2,
  },
  fab: {
    zIndex: 9999,
  },
})

class FABButton extends Component {
  render() {
    const { label, onPress } = this.props
    return (
      <View style={styles.root}>
        <FAB style={styles.fab} label={label} onPress={onPress} />
      </View>
    )
  }
}

export default FABButton
