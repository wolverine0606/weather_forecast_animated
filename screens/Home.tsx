import { StyleSheet } from "react-native";
import React from "react";
import HomeBackground from "@/components/HomeBackground";
import Weatherinfo from "@/components/section/Weatherinfo";
import ForecastSheet from "@/components/sheet/ForecastSheet";
import WeatherTabBar from "@/components/tabBar/WeatherTabBar";
import { currentWeather } from "@/data/CurrentWeather";
import { ForecastSheetProvider } from "@/context/ForecastSheetContex";

const Home = () => {
  return (
    <ForecastSheetProvider>
      <HomeBackground />
      <Weatherinfo weather={currentWeather} />
      <ForecastSheet />
      <WeatherTabBar />
    </ForecastSheetProvider>
  );
};

export default Home;
