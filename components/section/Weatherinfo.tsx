import { StyleSheet } from "react-native";
import React from "react";
import { Weather } from "@/models/Weather";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useApplicationDimensions from "@/hooks/useApplicationDimensions";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useForecastSheetPosition } from "@/context/ForecastSheetContex";

interface WeatherinfoProps {
  weather: Weather;
}

const Weatherinfo = ({ weather }: WeatherinfoProps) => {
  const { city, temperature, condition, high, low } = weather;

  const { height } = useApplicationDimensions();
  const { top } = useSafeAreaInsets();

  const topMargin = height / 17;
  const weatherInfoMargin = top + topMargin;

  const myStyles = styles(weatherInfoMargin);

  const animatedPosition = useForecastSheetPosition();
  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            animatedPosition.value,
            [0, 1],
            [0, -topMargin],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const animatedConditionTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedPosition.value, [0, 0.5, 1], [1, 0, 1]),
      transform: [
        {
          translateY: interpolate(
            animatedPosition.value,
            [0, 0.5, 1],
            [0, -20, 0],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const animatedTemtTextStyles = useAnimatedStyle(() => {
    const fontFamily = animatedPosition.value > 0.5 ? "SF-semibold" : "SF-thin";
    return {
      fontFamily,
      opacity: interpolate(animatedPosition.value, [0, 0.5, 1], [1, 0, 1]),
      fontSize: interpolate(animatedPosition.value, [0, 1], [96, 20]),
      lineHeight: interpolate(animatedPosition.value, [0, 1], [96, 20]),
      color: interpolateColor(
        animatedPosition.value,
        [0, 1],
        ["white", "rgba(235,235,245,0.6)"]
      ),
    };
  });
  const animatedTemtSymbolTextStyles = useAnimatedStyle(() => {
    const fontFamily = animatedPosition.value > 0.5 ? "SF-semibold" : "SF-thin";
    return {
      fontFamily,
      opacity: interpolate(animatedPosition.value, [0, 0.5, 1], [1, 0, 1]),
      fontSize: interpolate(animatedPosition.value, [0, 1], [48, 20]),
      lineHeight: interpolate(animatedPosition.value, [0, 1], [48, 20]),
      right: interpolate(animatedPosition.value, [0, 1], [-10, -7]),
      color: interpolateColor(
        animatedPosition.value,
        [0, 1],
        ["white", "rgba(235,235,245,0.6)"]
      ),
    };
  });

  const textOpacity = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedPosition.value, [0, 0.5], [1, 0]),
    };
  });

  const animatedSeparatorStyle = useAnimatedStyle(() => {
    const display = animatedPosition.value > 0.5 ? "flex" : "none";
    return {
      display,
      opacity: interpolate(animatedPosition.value, [0, 0.8, 1], [0, 0, 1]),
    };
  });
  const animatedTemptConditionStyle = useAnimatedStyle(() => {
    const flexDirection = animatedPosition.value > 0.5 ? "row" : "column";
    return {
      flexDirection,
    };
  });

  return (
    <Animated.View style={[myStyles.container, animatedViewStyle]}>
      <Animated.Text style={myStyles.cityText}>{city}</Animated.Text>
      <Animated.View style={animatedTemptConditionStyle}>
        {/* temperature box */}
        <Animated.View style={{ flexDirection: "row" }}>
          <Animated.View style={myStyles.temperatureBox}>
            <Animated.Text
              style={[myStyles.temperatureText, animatedTemtTextStyles]}
            >
              {temperature}
            </Animated.Text>
            <Animated.Text
              style={[myStyles.temperatureSymbol, animatedTemtSymbolTextStyles]}
            >
              °
            </Animated.Text>
          </Animated.View>
          <Animated.Text
            style={[myStyles.separatorStyle, animatedSeparatorStyle]}
          >
            |
          </Animated.Text>
        </Animated.View>
        <Animated.Text
          style={[myStyles.conditionText, animatedConditionTextStyle]}
        >
          {condition}
        </Animated.Text>
      </Animated.View>

      <Animated.Text style={[myStyles.minMaxText, textOpacity]}>
        H:{high}° L:{low}°
      </Animated.Text>
    </Animated.View>
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
    separatorStyle: {
      fontSize: 20,
      lineHeight: 20,
      fontFamily: "SF-semibold",
      color: "rgba(235,235,245,0.6)",
      marginHorizontal: 10,
      display: "none",
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
