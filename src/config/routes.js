import React from "react"

import Camera from "../screens/Camera"
import Home from "../screens/Home"
import Reference from "../screens/Reference"

import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator()

function StackRoutes() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Reference" component={Reference} />
      <Stack.Screen name="Camera" component={Camera} />
    </Stack.Navigator>
  )
}

export default StackRoutes
