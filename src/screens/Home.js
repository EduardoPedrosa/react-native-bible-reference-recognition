import React, { Component } from "react"
import { View, StyleSheet, Dimensions } from "react-native"

import Camera from "@components/Camera/Camera"

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window")

const styles = StyleSheet.create({
  root: { width: "100%", height: "100%" },
})

class Home extends Component {
  render() {
    return (
      <View style={styles.root}>
        <Camera />
      </View>
    )
  }
}

export default Home
