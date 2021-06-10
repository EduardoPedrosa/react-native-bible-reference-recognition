import React from "react"
import { View, StyleSheet, Text, Dimensions } from "react-native"
import { RNCamera } from "react-native-camera"

import FABButton from "./FABButton"

import biblicalReferenceRegex from "@utils/regex/biblicalReferenceRegex"
import sleep from "@utils/sleep"
import colors from "@utils/theme/colors"

import RootNavigation from "@config/RootNavigation"

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window")

const DELAY_TIME = 3000
// const CAM_HEIGHT = WIDTH * 1.5
const CAM_HEIGHT = HEIGHT
const CAM_WIDTH = WIDTH

const RECT_WIDTH = 300
const RECT_HEIGHT = 100

// const ERROR_MARGIN = 25
const ERROR_MARGIN = 0

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
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
    borderColor: colors.primary,
    borderWidth: 5,
    borderRadius: 24,
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

export default class Camera extends React.Component {
  constructor(props) {
    super(props)
    this.waiting = false
  }

  state = {
    canDetectText: true,
    reference: "",
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
    const x = bounds.size.width / 2 + bounds.origin.x
    const y = bounds.size.height / 2 + bounds.origin.y
    return { x, y }
  }

  isInRectOfInterest = (bounds) => {
    const { x, y } = this.getCenterCoordinates(bounds)
    const xCenter = CAM_WIDTH / 2
    const xLeft = xCenter - RECT_WIDTH / 2 - ERROR_MARGIN
    const xRight = xCenter + RECT_WIDTH / 2 + ERROR_MARGIN
    if (x > xLeft && x < xRight) {
      const yCenter = CAM_HEIGHT / 2
      const yUp = yCenter - RECT_HEIGHT / 2 - ERROR_MARGIN
      const yDown = yCenter + RECT_HEIGHT / 2 + ERROR_MARGIN
      if (y > yUp && y < yDown) {
        return true
      }
    }
    return false
  }

  canExecute = async () => {
    if (this.waiting) {
      return false
    }
    this.waiting = true
    await sleep(DELAY_TIME)
    this.waiting = false
    return true
  }

  // Distancia do ponto até o central que é (0, RECT_HEIGHT/2)
  pointsDistance = (point) => {
    const xCenter = 0
    const yCenter = RECT_WIDTH / 2
    const distance = Math.sqrt(
      Math.pow(point.x - xCenter, 2) + Math.pow(point.y - yCenter, 2)
    )
    return distance
  }

  // Rever retorno dos pontos pelo algoritmo (significado do x e y)
  sortBlocks = (a, b) => {
    const distanceA = this.pointsDistance(this.getCenterCoordinates(a.bounds))
    const distanceB = this.pointsDistance(this.getCenterCoordinates(b.bounds))

    return distanceB - distanceA
  }

  textRecognized = async (resp) => {
    const { textBlocks } = resp
    const sortedTextBlocks = textBlocks.slice().sort(this.sortBlocks)
    for (const block of sortedTextBlocks) {
      const value = block.value
      if (this.isInRectOfInterest(block.bounds)) {
        if (biblicalReferenceRegex.test(value)) {
          // Impede de setar o estado (intervalo mínimo entre execuções é de DELAY_TIME)
          if (!(await this.canExecute())) return

          const match = value.match(biblicalReferenceRegex)
          this.setState({
            reference: match[0] && match[0].trim(),
          })
          return
        }
      }
    }
    this.setState({ reference: "" })
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
        <View style={styles.container}>{this.renderCamera()}</View>
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
