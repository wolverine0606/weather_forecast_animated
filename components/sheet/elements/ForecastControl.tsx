import {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextLayoutEventData,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Canvas, Line, LinearGradient, vec } from "@shopify/react-native-skia";

const ForecastControl = () => {
  const [textWidth, setTextWidth] = useState(0);

  const spacingX = 25;
  const stroleWidth = 3;

  function onTextLayout(
    event: NativeSyntheticEvent<TextLayoutEventData>
  ): void {
    setTextWidth(event.nativeEvent.lines[0].width);
    console.log(textWidth);
  }

  return (
    <>
      <View style={styles.forecastControl}>
        <TouchableOpacity>
          <Text onTextLayout={onTextLayout} style={styles.forecastText}>
            Hourly Forecast
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forecastText}>Weekly Forecast</Text>
        </TouchableOpacity>
      </View>
      <Canvas
        style={{ height: stroleWidth, width: textWidth, marginLeft: spacingX }}
      >
        <Line p1={vec(0, 0)} p2={vec(textWidth, 0)} strokeWidth={spacingX}>
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
    </>
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
    paddingHorizontal: 32,
  },
});
