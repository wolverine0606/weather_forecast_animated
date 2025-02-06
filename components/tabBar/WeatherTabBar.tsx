import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ArcComponent from "./elements/ArcComponent";
import useApplicationDimensions from "@/hooks/useApplicationDimensions";
import TabBarItems from "./elements/TabBarItems";
import { BlurView } from "expo-blur";

const WeatherTabBar = () => {
  const TabBarHeight = 88;
  const { height, width } = useApplicationDimensions();

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        top: height - TabBarHeight,
      }}
    >
      <ArcComponent height={TabBarHeight} width={width} />
      <TabBarItems />
    </View>
  );
};

export default WeatherTabBar;

const styles = StyleSheet.create({});
