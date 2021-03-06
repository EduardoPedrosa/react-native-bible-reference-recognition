import React, { Component } from "react"
import { View, StyleSheet } from "react-native"

import InitScanContainer from "@components/Home/InitScanContainer"

const styles = StyleSheet.create({
  root: { width: "100%", height: "100%" },
})

class Home extends Component {
  render() {
    return (
      <View style={styles.root}>
        <InitScanContainer />
      </View>
    )
  }
}

export default Home
