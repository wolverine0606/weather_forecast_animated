import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import ForecastSheetBackground from "./ForecastSheetBackground";
import useApplicationDimensions from "@/hooks/useApplicationDimensions";
import ForecastControl from "./elements/ForecastControl";
import Seperator from "./elements/Seperator";
import { hourly, weekly } from "@/data/ForecastData";
import ForecastScroll from "../forecast/ForecastScroll";
import { ForecastType } from "@/models/Weather";
import AirQualityWidget from "../widgets/components/forecast/widgets/AirQualityWidget";
import FeelsLikeWidget from "../widgets/components/forecast/widgets/FeelsLikeWidget";
import HumidityWidget from "../widgets/components/forecast/widgets/HumidityWidget";
import UvIndexWidget from "../widgets/components/forecast/widgets/UvIndexWidget";
import SunriseWidget from "../widgets/components/forecast/widgets/SunriseWidget";
import WindWidget from "../widgets/components/forecast/widgets/WindWidget";
import RainFallWidget from "../widgets/components/forecast/widgets/RainFallWidget";
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useForecastSheetPosition } from "@/context/ForecastSheetContex";

const ForecastSheet = () => {
  const { width, height, PADDING_HORISONTAL } = useApplicationDimensions();

  const snapPoints = ["38.5%", "83%"];
  const firstSnapPoint = height * (parseFloat(snapPoints[0]) / 100); // take 38.5% of height
  const secondSnapPoint = height * (parseFloat(snapPoints[1]) / 100); // take 83% of height

  const minY = height - secondSnapPoint; // 83% of height
  const maxY = height - firstSnapPoint; // 38.5% of height
  const cornerRadius = 44;

  const widgetGap = PADDING_HORISONTAL / 4;

  const smallWidgetSize = width / 2 - widgetGap * 2.5;
  const bigWidgetSize = width - PADDING_HORISONTAL;

  const capsuleRadius = 30;
  const capsuleHeight = height * 0.17;
  const capsuleWidth = width * 0.15;
  const airQualityHeight = height * 0.18;

  const currentPosition = useSharedValue(0);
  const animatedPosition = useForecastSheetPosition();
  const normalizePositions = (value: number) => {
    "worklet";
    return ((value - maxY) / (maxY - minY)) * -1;
  };
  useAnimatedReaction(
    () => {
      return currentPosition.value;
    },
    (cv) => {
      animatedPosition.value = normalizePositions(cv);
    }
  );

  const [selectedForecastType, setSelectedForecastType] =
    useState<ForecastType>(ForecastType.Hourly);

  const translateXhourly = useSharedValue(0);
  const translateXWeekly = useSharedValue(width);

  const animatedHourlyStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateXhourly.value }],
    };
  });
  const animatedWeeklyStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateXWeekly.value }],
    };
  });

  useEffect(() => {
    if (selectedForecastType === ForecastType.Hourly) {
      translateXhourly.value = withTiming(0);
      translateXWeekly.value = withTiming(width);
    } else {
      translateXhourly.value = withTiming(-width - PADDING_HORISONTAL);
      translateXWeekly.value = withTiming(-width);
    }
  }, [selectedForecastType]);

  return (
    <BottomSheet
      animatedPosition={currentPosition}
      animateOnMount={false}
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
      <BottomSheetView
        style={[styles.sheetContent, { height: firstSnapPoint }]}
      >
        <ForecastControl
          displayType={selectedForecastType}
          onPress={(type) => setSelectedForecastType(type)}
        />
        <Seperator width={width} height={2} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, height: "100%", width: "100%" }}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Animated.View style={animatedHourlyStyles}>
              <ForecastScroll
                forecast={hourly}
                capsuleWidth={capsuleWidth}
                capsuleHeight={capsuleHeight}
                capsuleRadius={capsuleRadius}
              />
            </Animated.View>
            <Animated.View style={animatedWeeklyStyles}>
              <ForecastScroll
                forecast={weekly}
                capsuleWidth={capsuleWidth}
                capsuleHeight={capsuleHeight}
                capsuleRadius={capsuleRadius}
              />
            </Animated.View>
          </View>

          <View style={{ flex: 1, paddingBottom: 50, paddingTop: 30 }}>
            <AirQualityWidget height={airQualityHeight} width={bigWidgetSize} />
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                padding: widgetGap,
                gap: widgetGap,
              }}
            >
              <UvIndexWidget
                width={smallWidgetSize}
                height={smallWidgetSize}
              ></UvIndexWidget>
              <SunriseWidget
                width={smallWidgetSize}
                height={smallWidgetSize}
              ></SunriseWidget>
              <WindWidget
                width={smallWidgetSize}
                height={smallWidgetSize}
              ></WindWidget>
              <RainFallWidget
                width={smallWidgetSize}
                height={smallWidgetSize}
              ></RainFallWidget>
              <FeelsLikeWidget
                width={smallWidgetSize}
                height={smallWidgetSize}
              ></FeelsLikeWidget>
              <HumidityWidget
                width={smallWidgetSize}
                height={smallWidgetSize}
              ></HumidityWidget>
            </View>
          </View>
        </ScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  sheetContent: {
    flex: 1,
  },
});

export default ForecastSheet;
