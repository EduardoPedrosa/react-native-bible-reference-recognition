import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Home from "../screens/Home"
import Reference from "../screens/Reference"

const Stack = createStackNavigator()

function StackRoutes() {
  return (
    <Stack.Navigator initialRouteName="Home" >
      <Stack.Screen
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="Reference"
        component={Reference}
      />
    </Stack.Navigator>
  )
}

export default StackRoutes
