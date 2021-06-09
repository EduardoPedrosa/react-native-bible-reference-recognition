import React from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import { Provider as PaperProvider } from "react-native-paper"
import { SafeAreaProvider } from "react-native-safe-area-context"

import theme from "@utils/theme/theme"

import NavigationContainer from "@config/NavigationContainer"
import Navigator from "@config/routes"
import setDefaultStyles from "@config/setDefaultStyles"

setDefaultStyles()

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Navigator />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({})

export default App
