import React, { Component } from "react"
import { View } from "react-native"
import { Provider } from "react-redux"

import { PersistGate } from "redux-persist/integration/react"

import colors from "@utils/theme/colors"

import initializeStore from "@config/store"

const { store, persistor } = initializeStore()

class ReduxProvider extends Component {
  render() {
    const { children } = this.props
    return (
      <Provider store={store}>
        <PersistGate
          loading={
            <View
              style={{ flex: 1, backgroundColor: colors.background }}
            ></View>
          }
          persistor={persistor}
        >
          {children}
        </PersistGate>
      </Provider>
    )
  }
}

export default ReduxProvider
