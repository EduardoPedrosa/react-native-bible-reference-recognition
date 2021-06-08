import React, { useRef } from "react"
import { NavigationContainer } from "@react-navigation/native"
// import analytics from "@react-native-firebase/analytics"
import { navigationRef } from "./RootNavigation"

export default ({ children }) => {
  const routeNameRef = useRef()

  return (
    <NavigationContainer
      ref={navigationRef}
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
