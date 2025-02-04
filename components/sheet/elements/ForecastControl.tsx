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
import { ForecastType } from "@/models/Weather";

interface ForecastControlProps {
  onPress: (forecastType: ForecastType) => void;
  displayType: ForecastType;
}

const ForecastControl = ({ onPress, displayType }: ForecastControlProps) => {
  const [textWidth, setTextWidth] = useState(0);

  const spacingX = 32;
  const strokeWidth = 3;

  function onTextLayout(
    event: NativeSyntheticEvent<TextLayoutEventData>
  ): void {
    setTextWidth(event.nativeEvent.lines[0].width);
  }

  return (
    <>
      <View style={styles.forecastControl}>
        <TouchableOpacity onPress={() => onPress(ForecastType.Hourly)}>
          <Text onTextLayout={onTextLayout} style={styles.forecastText}>
            Hourly Forecast
          </Text>
          {displayType === ForecastType.Hourly ? (
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
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress(ForecastType.Weekly)}>
          <Text style={styles.forecastText}>Weekly Forecast</Text>
          {displayType === ForecastType.Weekly ? (
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
          ) : null}
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {/* {displayType === ForecastType.Hourly ? ( */}

        {/* ) : ( */}

        {/* )} */}
      </View>
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
