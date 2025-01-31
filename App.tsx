import React from "react";
import HomeBackground from "./components/HomeBackground";
import { StatusBar } from "expo-status-bar";
import WeatherTabBar from "./components/tabBar/WeatherTabBar";

export default function App() {
  return (
    <>
      <HomeBackground />
      <WeatherTabBar />
      <StatusBar style="light" />
    </>
  );
}
