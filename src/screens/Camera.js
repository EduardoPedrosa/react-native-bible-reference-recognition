import React, { Component } from "react"
import { View, StyleSheet } from "react-native"

import Camera from "@components/Camera/Camera"

const styles = StyleSheet.create({
  root: { width: "100%", height: "100%" },
})

class CameraScreen extends Component {
  render() {
    return (
      <View style={styles.root}>
        <Camera />
      </View>
    )
  }
}

export default CameraScreen
