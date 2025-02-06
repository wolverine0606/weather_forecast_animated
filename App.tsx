import React, { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import Home from "./screens/Home";
import BasicAnimation from "./screens/BasicAnimation";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "SF-thin": require("./assets/fonts/SF-Pro-Display-Thin.otf"),
    "SF-regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
    "SF-semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
  });

  const onFontsLoaded = useCallback(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaProvider onLayout={onFontsLoaded}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Home />
        {/* <BasicAnimation /> */}
        <StatusBar style="light" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
