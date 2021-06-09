import React from "react"
import { View, StyleSheet, Text, Dimensions } from "react-native"
import { RNCamera } from "react-native-camera"

import FABButton from "./FABButton"

import RootNavigation from "@config/RootNavigation"

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window")

const CAM_HEIGHT = WIDTH * 1.5
const CAM_WIDTH = WIDTH

const RECT_WIDTH = 300
const RECT_HEIGHT = 100
const ERROR_MARGIN = 25

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: CAM_HEIGHT,
    width: CAM_WIDTH,
  },
  camera: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  rectOfInterest: {
    position: "absolute",
    borderColor: "#0d47a1",
    borderWidth: 5,
    borderRadius: 4,
    height: RECT_HEIGHT,
    width: RECT_WIDTH,
  },
  responseContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  response: {
    fontSize: 30,
    fontWeight: "bold",
    color: "yellow",
  },
})

export default class OCRScreen extends React.Component {
  state = {
    canDetectText: true,
    reference: "",
    camTop: 0,
  }

  renderCamera = () => {
    const { canDetectText } = this.state
    return (
      <RNCamera
        ref={(ref) => {
          this.camera = ref
        }}
        style={{ flex: 1 }}
        trackingEnabled
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
        captureAudio={false}
        autoFocus
        onTextRecognized={canDetectText ? this.textRecognized : null}
      >
        <View style={styles.camera}>
          <View style={styles.rectOfInterest}></View>
          {!!canDetectText && this.renderTextBlocks()}
        </View>
      </RNCamera>
    )
  }

  getCenterCoordinates = (bounds) => {
    const x = (bounds.size.width + bounds.origin.x) / 2
    const y = (bounds.size.height + bounds.origin.y) / 2
    return { x, y }
  }

  isInRectOfInterest = (bounds) => {
    const { x, y } = this.getCenterCoordinates(bounds)
    const xCenter = CAM_WIDTH / 2
    const xLeft = xCenter - RECT_WIDTH / 2 - ERROR_MARGIN
    const xRight = xCenter + RECT_WIDTH / 2 + ERROR_MARGIN
    if (x > xLeft && x < xRight) {
      const yCenter = CAM_HEIGHT / 2
      const yUp = yCenter - RECT_HEIGHT / 2 - ERROR_MARGIN - this.state.camTop
      const yDown = yCenter + RECT_HEIGHT / 2 + ERROR_MARGIN - this.state.camTop
      // console.log(y, yUp, yDown)
      if (y > yUp && y < yDown) {
        return true
      }
    }
    return false
  }

  textRecognized = (resp) => {
    const { textBlocks } = resp
    let founded = false
    textBlocks.forEach((block) => {
      const biblicalRegex =
        /(\d)?(\s)?[a-z, A-Z]{1,3}(\s)?(\d+)([:\.](\d+)([-,](\d+))?)?/
      const value = block.value
      if (this.isInRectOfInterest(block.bounds)) {
        if (biblicalRegex.test(value)) {
          const match = value.match(biblicalRegex)
          this.setState({
            reference: match[0],
          })
          founded = true
        }
      }
    })
    if (!founded) {
      this.setState({ reference: "" })
    }
  }

  renderTextBlocks = () => {
    return <View style={styles.responseContainer} pointerEvents="none"></View>
  }

  goToReference = () => {
    RootNavigation.navigate("Reference", {
      reference: this.state.reference,
    })
  }

  render() {
    return (
      <View style={styles.root}>
        <View
          style={styles.container}
          onLayout={(event) =>
            this.setState({ camTop: event.nativeEvent.layout.y })
          }
        >
          {this.renderCamera()}
        </View>
        {this.state.reference ? (
          <FABButton
            onPress={this.goToReference}
            label={this.state.reference}
          />
        ) : null}
      </View>
    )
  }
}
