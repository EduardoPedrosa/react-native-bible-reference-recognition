import React, { useRef } from "react"

// import analytics from "@react-native-firebase/analytics"
import { navigationRef } from "./RootNavigation"

import { NavigationContainer } from "@react-navigation/native"

export default ({ children, theme }) => {
  const routeNameRef = useRef()

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={theme}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      }
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current
        const currentRouteName = navigationRef.current.getCurrentRoute().name

        if (previousRouteName !== currentRouteName) {
          // await analytics().logScreenView({
          //   screen_name: currentRouteName,
          //   screen_class: currentRouteName,
          // })
        }
        routeNameRef.current = currentRouteName
      }}
    >
      {children}
    </NavigationContainer>
  )
}
