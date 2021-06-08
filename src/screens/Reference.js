import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"

import requestApi from "@utils/requestApi"

const styles = StyleSheet.create({
  verseContainer: {
    flexDirection: "row",
  },
  number: {
    fontWeight: "bold",
    paddingRight: 5,
    color: "#444",
  },
  text: {
    color: "#666",
  },
})

class Reference extends Component {
  state = {
    verses: [],
  }

  componentDidMount() {
    const reference = this.props.route.params.reference
    requestApi({
      url: `/reference/${reference}`,
    })
      .then((resp) => {
        this.setState({ verses: resp.data.verses })
      })
      .catch((e) => console.log(e))
  }

  render() {
    return (
      <View>
        {this.state.verses.map((v) => (
          <View style={styles.verseContainer}>
            <Text style={styles.number}>{v.number}</Text>
            <Text style={styles.text}>{v.text}</Text>
          </View>
        ))}
      </View>
    )
  }
}

export default Reference
