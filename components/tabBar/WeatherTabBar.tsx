import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ArcComponent from "./elements/ArcComponent";
import useApplicationDimensions from "@/hooks/useApplicationDimensions";
import TabBarItems from "./elements/TabBarItems";
import { BlurView } from "expo-blur";
import { useForecastSheetPosition } from "@/context/ForecastSheetContex";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const WeatherTabBar = () => {
  const TabBarHeight = 88;
  const { height, width } = useApplicationDimensions();

  const animatedPosition = useForecastSheetPosition();
  const animatedViewStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            animatedPosition.value,
            [0, 1],
            [0, TabBarHeight + 20]
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        { ...StyleSheet.absoluteFillObject, top: height - TabBarHeight },
        animatedViewStyles,
      ]}
    >
      <BlurView
        intensity={50}
        tint="dark"
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
      >
        <ArcComponent height={TabBarHeight} width={width} />
        <TabBarItems />
      </BlurView>
    </Animated.View>
  );
};

export default WeatherTabBar;

const styles = StyleSheet.create({});
