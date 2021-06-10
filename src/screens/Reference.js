import React, { Component } from "react"
import { ScrollView, View, StyleSheet } from "react-native"

import ActivityIndicator from "@components/UI/ActivityIndicator"
import Text from "@components/UI/Text"

import requestApi from "@utils/requestApi"
import colors from "@utils/theme/colors"

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
    color: colors.primaryText,
  },
  text: {
    marginVertical: 4,
    fontSize: 18,
    color: colors.secondabryText,
  },
  reference: {
    fontSize: 24,
    color: colors.primaryText,
    marginBottom: 16,
  },
  error: {
    marginVertical: 16,
    fontSize: 18,
    textAlign: "center",
    color: colors.secondaryText,
  },
})

class Reference extends Component {
  state = {
    loading: true,
    error: false,
    reference: null,
    verses: [],
  }

  componentDidMount() {
    const reference = this.props.route.params.reference
    requestApi({
      url: `/reference/${reference}`,
    })
      .then((resp) => {
        this.setState({
          verses: resp.data.verses,
          loading: false,
          reference: {
            book: resp.data.book.name,
            chapter: resp.data.chapter.number,
          },
        })
      })
      .catch((e) => {
        this.setState({ loading: false, error: true })
      })
  }

  render() {
    const { reference } = this.state
    return (
      <ScrollView style={styles.root}>
        {this.state.loading ? <ActivityIndicator /> : null}
        {this.state.error ? (
          <Text style={styles.error}>Referência não encontrada</Text>
        ) : null}
        {reference ? (
          <Text
            fontWeight="bold"
            style={styles.reference}
          >{`${reference.book} ${reference.chapter}`}</Text>
        ) : null}
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
