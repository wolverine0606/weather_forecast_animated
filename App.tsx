import React, { useCallback } from "react";
import HomeBackground from "./components/HomeBackground";
import { StatusBar } from "expo-status-bar";
import WeatherTabBar from "./components/tabBar/WeatherTabBar";
import Weatherinfo from "./components/section/Weatherinfo";
import { currentWeather } from "./data/CurrentWeather";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ForecastSheet from "./components/sheet/ForecastSheet";
import { View } from "react-native";
import "react-native-reanimated";

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
        <View style={{ flex: 1 }}>
          <HomeBackground />
          <Weatherinfo weather={currentWeather} />
          <ForecastSheet />
          <WeatherTabBar />
          <StatusBar style="light" />
        </View>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
