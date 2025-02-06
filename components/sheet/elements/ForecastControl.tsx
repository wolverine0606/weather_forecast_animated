import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextLayoutEventData,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Canvas, Line, LinearGradient, vec } from "@shopify/react-native-skia";
import { ForecastType } from "@/models/Weather";
import useApplicationDimensions from "@/hooks/useApplicationDimensions";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

interface ForecastControlProps {
  onPress: (forecastType: ForecastType) => void;
  displayType: ForecastType;
}

const ForecastControl = ({ onPress, displayType }: ForecastControlProps) => {
  const [textWidth, setTextWidth] = useState(0);

  const { PADDING_HORISONTAL } = useApplicationDimensions();

  const strokeWidth = 3;
  const displayTypeAnimated = useSharedValue(displayType);

  useEffect(() => {
    displayTypeAnimated.value = displayType;
  }, [displayType]);

  function onTextLayout(
    event: NativeSyntheticEvent<TextLayoutEventData>
  ): void {
    setTextWidth(event.nativeEvent.lines[0].width);
  }
  const hourlyUnderline = useDerivedValue(() => {
    return displayType === ForecastType.Hourly ? 1 : 0;
  });
  const weeklyUnderline = useDerivedValue(() => {
    return displayType === ForecastType.Weekly ? 1 : 0;
  });
  const hourlyStyle = useAnimatedStyle(() => {
    const color =
      displayTypeAnimated.value === "Hourly"
        ? "rgba(255,255,245,0.75)"
        : "rgba(235,235,245,0.6)";

    return {
      color,
    };
  });
  const WeeklyStyle = useAnimatedStyle(() => {
    const color =
      displayTypeAnimated.value === "Weekly"
        ? "rgba(255,255,245,0.75)"
        : "rgba(235,235,245,0.6)";

    return {
      color,
    };
  });

  return (
    <View>
      <View
        style={[
          styles.forecastControl,
          { paddingHorizontal: PADDING_HORISONTAL },
        ]}
      >
        <TouchableOpacity onPress={() => onPress(ForecastType.Hourly)}>
          <Animated.Text
            onTextLayout={onTextLayout}
            style={[styles.forecastText, hourlyStyle]}
          >
            Hourly Forecast
          </Animated.Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress(ForecastType.Weekly)}>
          <Animated.Text style={[styles.forecastText, WeeklyStyle]}>
            Weekly Forecast
          </Animated.Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.forecastControl,
          { paddingHorizontal: PADDING_HORISONTAL },
        ]}
      >
        <Canvas
          style={{
            height: strokeWidth,
            width: textWidth,
          }}
        >
          <Line
            p1={vec(0, 0)}
            p2={vec(textWidth, 0)}
            strokeWidth={strokeWidth}
            opacity={hourlyUnderline}
          >
            <LinearGradient
              start={vec(0, 0)}
              end={vec(textWidth, 0)}
              colors={[
                "rgba(147, 112, 177, 0)",
                "rgba(147, 112, 177, 1)",
                "rgba(147, 112, 177, 0)",
              ]}
            />
          </Line>
        </Canvas>
        <Canvas
          style={{
            height: strokeWidth,
            width: textWidth,
          }}
        >
          <Line
            p1={vec(0, 0)}
            p2={vec(textWidth, 0)}
            strokeWidth={strokeWidth}
            opacity={weeklyUnderline}
          >
            <LinearGradient
              start={vec(0, 0)}
              end={vec(textWidth, 0)}
              colors={[
                "rgba(147, 112, 177, 0)",
                "rgba(147, 112, 177, 1)",
                "rgba(147, 112, 177, 0)",
              ]}
            />
          </Line>
        </Canvas>
      </View>
    </View>
  );
};

export default ForecastControl;

const styles = StyleSheet.create({
  forecastText: {
    color: "rgba(235,235,245,0.6)",
    fontSize: 15,
    lineHeight: 20,
    fontFamily: "SF-semibold",
  },
  forecastControl: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
