import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Weather } from "@/models/Weather";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useApplicationDimensions from "@/hooks/useApplicationDimensions";

interface WeatherinfoProps {
  weather: Weather;
}

const Weatherinfo = ({ weather }: WeatherinfoProps) => {
  const { city, temperature, condition, high, low } = weather;

  const { height } = useApplicationDimensions();
  const { top } = useSafeAreaInsets();

  const weatherInfoMargin = top + height / 17;

  const myStyles = styles(weatherInfoMargin);

  return (
    <View style={myStyles.container}>
      <Text style={myStyles.cityText}>{city}</Text>
      <View style={myStyles.temperatureBox}>
        <Text style={myStyles.temperatureText}>{temperature}</Text>
        <Text style={myStyles.temperatureSymbol}>°</Text>
      </View>
      <Text style={myStyles.conditionText}>{condition}</Text>
      <Text style={myStyles.minMaxText}>
        H:{high}° L:{low}°
      </Text>
    </View>
  );
};

export default Weatherinfo;

const styles = (margin: number) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      marginTop: margin,
    },
    cityText: {
      color: "white",
      fontSize: 34,
      fontFamily: "SF-regular",
    },
    temperatureBox: {
      flexDirection: "row",
    },
    temperatureSymbol: {
      position: "absolute",
      right: -10,
      color: "white",
      fontSize: 48,
      lineHeight: 48,
      fontFamily: "SF-thin",
    },
    temperatureText: {
      color: "white",
      fontSize: 96,
      lineHeight: 96,
      fontFamily: "SF-thin",
    },
    conditionText: {
      fontSize: 20,
      lineHeight: 20,
      fontFamily: "SF-semibold",
      color: "rgba(235,235,245,0.6)",
    },
    minMaxText: {
      color: "white",
      fontSize: 20,
      lineHeight: 20,
      fontFamily: "SF-semibold",
    },
  });
