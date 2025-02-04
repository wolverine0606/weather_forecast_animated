import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Forecast, ForecastType } from "@/models/Weather";
import { Canvas, RoundedRect, Shadow } from "@shopify/react-native-skia";
import { conbertDateTo12HourFormat, getDayOfWeek } from "@/utils/DateHelper";

interface ForecastCapsuleProps {
  forecast: Forecast;
  width: number;
  height: number;
  radius: number;
}

const ForecastCapsule = ({
  forecast,
  width,
  height,
  radius,
}: ForecastCapsuleProps) => {
  const { date, icon, probability, temperature, type } = forecast;

  const timeDateOpacityDisplay = (): [string, number] => {
    let opacity = 0;
    let timeOrDate = "";

    if (type === ForecastType.Hourly) {
      timeOrDate = conbertDateTo12HourFormat(date);
      opacity = timeOrDate.toLocaleLowerCase() == "now" ? 1 : 0.2;
    } else {
      const [dayOfWeek, isToday] = getDayOfWeek(date);

      timeOrDate = dayOfWeek.toString();
      opacity = isToday ? 1 : 0.2;
    }

    return [timeOrDate, opacity];
  };

  const [timeToDisplay, capsuleOpacity] = timeDateOpacityDisplay();
  const probabilityOpacity = probability != 0 ? 1 : 0;

  return (
    <View style={{ width: width, height, borderRadius: radius }}>
      <Canvas style={{ flex: 1, ...StyleSheet.absoluteFillObject }}>
        <RoundedRect
          x={0}
          y={0}
          width={width}
          height={height}
          r={radius}
          color={`rgba(72,49,157,${capsuleOpacity})`}
        >
          <Shadow
            dx={0.5}
            dy={0.5}
            blur={1}
            color={"rgba(255,255,255,0.5)"}
            inner
          />
        </RoundedRect>
      </Canvas>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: height * 0.15,
        }}
      >
        <Text style={styles.time}>{timeToDisplay}</Text>
        <View>
          <Image
            source={icon}
            style={{ width: width * 0.5, aspectRatio: 1, top: 0 }}
          />
          <Text style={[styles.probability, { opacity: probabilityOpacity }]}>
            {probability}%
          </Text>
        </View>
        <Text style={styles.temperature}>{temperature}°</Text>
      </View>
    </View>
  );
};

export default ForecastCapsule;

const styles = StyleSheet.create({
  time: {
    fontFamily: "SF-semibold",
    fontSize: 15,
    lineHeight: 20,
    color: "white",
    letterSpacing: 0.5,
  },
  probability: {
    fontFamily: "SF-semibold",
    fontSize: 13,
    lineHeight: 18,
    color: "#40CBD8",
    textAlign: "center",
  },
  temperature: {
    fontFamily: "SF-semibold",
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0.38,
    color: "rgba(255,255,255,1)",
  },
});
