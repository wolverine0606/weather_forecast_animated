import { StyleSheet, View } from "react-native";
import React from "react";
import { Forecast } from "@/models/Weather";
import { ScrollView } from "react-native-gesture-handler";
import ForecastCapsule from "./ForecastCapsule";
import useApplicationDimensions from "@/hooks/useApplicationDimensions";

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
  const { PADDING_HORISONTAL } = useApplicationDimensions();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        paddingLeft: 20,
        paddingTop: capsuleHeight * 0.1,
        paddingBottom: capsuleHeight * 0.05,
        flexGrow: 0,
        paddingRight: PADDING_HORISONTAL,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          gap: capsuleWidth * 0.2,
        }}
      >
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
      <View style={{ width: PADDING_HORISONTAL }} />
    </ScrollView>
  );
};

export default ForecastScroll;

const styles = StyleSheet.create({});
