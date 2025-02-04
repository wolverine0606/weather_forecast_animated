import React, { useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import ForecastSheetBackground from "./ForecastSheetBackground";
import useApplicationDimensions from "@/hooks/useApplicationDimensions";
import ForecastControl from "./elements/ForecastControl";
import Seperator from "./elements/Seperator";
import ForecastCapsule from "../forecast/ForecastCapsule";
import { hourly, weekly } from "@/data/ForecastData";
import ForecastScroll from "../forecast/ForecastScroll";
import { ForecastType } from "@/models/Weather";

const ForecastSheet = () => {
  const { width, height } = useApplicationDimensions();

  const snapPoints = ["38.5%", "83%"];
  const firstSnapPoint = height * parseFloat(snapPoints[0]);
  const cornerRadius = 44;

  const capsuleRadius = 30;
  const capsuleHeight = height * 0.17;
  const capsuleWidth = width * 0.15;

  const [selectedForecastType, setSelectedForecastType] =
    useState<ForecastType>(ForecastType.Hourly);

  return (
    <View style={styles.container}>
      <BottomSheet
        enableDynamicSizing
        snapPoints={snapPoints}
        handleIndicatorStyle={{
          height: 5,
          width: 48,
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
        backgroundComponent={() => (
          <ForecastSheetBackground
            width={width}
            height={firstSnapPoint}
            cornerRadius={cornerRadius}
          />
        )}
      >
        <BottomSheetView style={styles.sheetContent}>
          <ForecastControl
            displayType={selectedForecastType}
            onPress={(type) => setSelectedForecastType(type)}
          />
          <Seperator width={width} height={2} />
          <ForecastScroll
            forecast={
              selectedForecastType == ForecastType.Hourly ? hourly : weekly
            }
            capsuleWidth={capsuleWidth}
            capsuleHeight={capsuleHeight}
            capsuleRadius={capsuleRadius}
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sheetContent: {
    flex: 1,
  },
});

export default ForecastSheet;
