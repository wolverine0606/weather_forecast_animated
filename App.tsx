import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigators/RootNavigator";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "SF-thin": require("./assets/fonts/SF-Pro-Display-Thin.otf"),
    "SF-regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
    "SF-semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      setTimeout(() => {
        setIsReady(true);
        SplashScreen.hideAsync();
      }, 2000); // 5 seconds delay
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || !isReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "black" }}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        <StatusBar style="light" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
