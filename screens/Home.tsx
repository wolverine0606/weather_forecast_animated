import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeBackground from "@/components/HomeBackground";
import Weatherinfo from "@/components/section/Weatherinfo";
import ForecastSheet from "@/components/sheet/ForecastSheet";
import WeatherTabBar from "@/components/tabBar/WeatherTabBar";
import { currentWeather } from "@/data/CurrentWeather";

const Home = () => {
  return (
    <>
      <HomeBackground />
      <Weatherinfo weather={currentWeather} />
      <ForecastSheet />
      <WeatherTabBar />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
