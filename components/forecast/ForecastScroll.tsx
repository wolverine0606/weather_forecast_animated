import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Forecast } from "@/models/Weather";
import { ScrollView } from "react-native-gesture-handler";
import ForecastCapsule from "./ForecastCapsule";

interface ForecastScrollProps {
  forecast: Forecast[];
  capsuleWidth: number;
  capsuleHeight: number;
  capsuleRadius: number;
}

const ForecastScroll = ({
  forecast,
  capsuleHeight,
  capsuleRadius,
  capsuleWidth,
}: ForecastScrollProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ paddingTop: 20, paddingLeft: 20 }}
    >
      <View style={{ flex: 1, flexDirection: "row", gap: 12 }}>
        {forecast.map((forecast, index) => (
          <ForecastCapsule
            key={index}
            forecast={forecast}
            width={capsuleWidth}
            height={capsuleHeight}
            radius={capsuleRadius}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default ForecastScroll;

const styles = StyleSheet.create({});
