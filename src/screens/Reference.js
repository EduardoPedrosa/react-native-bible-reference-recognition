import React, { Component } from "react"
import { ScrollView, View, StyleSheet } from "react-native"

import Text from "@components/UI/Text"

import requestApi from "@utils/requestApi"

const styles = StyleSheet.create({
  root: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  verseContainer: {
    flexDirection: "row",
  },
  number: {
    fontWeight: "bold",
    color: "#444",
  },
  text: {
    fontSize: 15,
    color: "#666",
    textAlign: "justify",
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
      <ScrollView style={styles.root}>
        {this.state.verses.map((v) => (
          <Text style={styles.text}>
            <Text style={styles.number}>{`${v.number}  `}</Text>
            {v.text}
          </Text>
        ))}
      </ScrollView>
    )
  }
}

export default Reference
