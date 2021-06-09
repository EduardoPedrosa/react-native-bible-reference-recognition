import React, { Component } from "react"
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import Ripple from "react-native-material-ripple"
import Icon from "react-native-vector-icons/EvilIcons"

import Text from "@components/UI/Text"

import colors from "@utils/theme/colors"

import RootNavigation from "@config/RootNavigation"

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window")

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    margin: 16,
  },
  gradient: {
    width: "100%",
    borderRadius: 24,
  },
  ripple: {
    width: "100%",
    height: 130,
    padding: 16,
    flexDirection: "row",
  },
  title: {
    color: colors.lightText,
    fontSize: 17,
    marginBottom: 8,
  },
  subtitle: {
    color: colors.lightText,
    fontSize: 15,
  },
  textColumn: {
    flex: 1,
    justifyContent: "center",
  },
  iconColumn: {
    width: 170,
  },
  icon: {
    color: colors.lightText,
    fontSize: 250,
  },
})

class InitScanContainer extends Component {
  goToCamera = () => {
    RootNavigation.navigate("Camera")
  }

  render() {
    return (
      <View style={styles.root}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[colors.primary, colors.primaryLight]}
          style={styles.gradient}
          pointerEvents="box-none"
        >
          <Ripple
            onPress={this.goToCamera}
            style={styles.ripple}
            rippleContainerBorderRadius={24}
            rippleColor={colors.lightText}
          >
            <View style={styles.textColumn}>
              <Text style={styles.title} fontWeight="bold">
                Ler referência bíblica
              </Text>
              <Text style={styles.subtitle}>
                Comece usando sua câmera para ler alguma referência bíblica
              </Text>
            </View>
            <View style={styles.iconColumn}>
              <Icon name="camera" style={styles.icon} />
            </View>
          </Ripple>
        </LinearGradient>
      </View>
    )
  }
}

export default InitScanContainer
