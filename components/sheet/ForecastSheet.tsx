import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import ForecastSheetBackground from "./ForecastSheetBackground";
import useApplicationDimensions from "@/hooks/useApplicationDimensions";
import ForecastControl from "./elements/ForecastControl";
import Seperator from "./elements/Seperator";

const ForecastSheet = () => {
  const { width, height } = useApplicationDimensions();
  const snapPoints = useMemo(() => ["38.5%", "83%"], []);
  const firstSnapPoint = height * parseFloat(snapPoints[0]);
  const secondSnapPoint = height * parseFloat(snapPoints[1]);
  const cornerRadius = 44;

  return (
    <View style={styles.container}>
      <BottomSheet
        snapPoints={snapPoints}
        enablePanDownToClose={false}
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
          <ForecastControl />
          <Seperator width={width} height={2} />
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
