import { StyleSheet } from "react-native";
import React from "react";
import ArcComponent from "./elements/ArcComponent";
import useApplicationDimensions from "@/hooks/useApplicationDimensions";
import TabBarItems from "./elements/TabBarItems";
import { useForecastSheetPosition } from "@/context/ForecastSheetContex";
import Animated, {
  Extrapolation,
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
            [0, TabBarHeight + 20],
            Extrapolation.CLAMP
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
      <ArcComponent height={TabBarHeight} width={width} />
      <TabBarItems />
    </Animated.View>
  );
};

export default WeatherTabBar;
