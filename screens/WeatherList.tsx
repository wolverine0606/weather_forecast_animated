import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import BackgroundGradient from "@/components/BackgroundGradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAppNavigation } from "@/utils/useAppNavigation";
import useApplicationDimensions from "@/hooks/useApplicationDimensions";
import {
  Canvas,
  LinearGradient,
  RoundedRect,
  Shadow,
  vec,
} from "@shopify/react-native-skia";
import { TextInput } from "react-native-gesture-handler";
import WeatherWidget from "@/components/WeatherWidget";
import { ForecastList } from "@/data/ForecastData";

const WeatherList = () => {
  const { top } = useSafeAreaInsets();
  const nav = useAppNavigation();
  const { PADDING_HORISONTAL, width } = useApplicationDimensions();
  return (
    <>
      <BackgroundGradient />
      <View
        style={{
          paddingTop: top + 2,
          flex: 1,
          paddingHorizontal: PADDING_HORISONTAL / 2,
          gap: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              suppressHighlighting={true}
              onPress={() => nav.goBack()}
              name="chevron-back"
              size={34}
              color="rgba(235, 235, 245, 0.6)"
            />
            <Text style={styles.titleStyles}>Weather</Text>
          </View>
          <Ionicons
            name="ellipsis-horizontal-circle"
            size={34}
            color="rgba(235, 235, 245, 0.6)"
          />
        </View>
        <View
          style={{
            borderRadius: 10,
            height: 36,
          }}
        >
          <Canvas style={StyleSheet.absoluteFillObject}>
            <RoundedRect x={0} y={0} height={36} width={width - 32} r={10}>
              <LinearGradient
                start={vec(0, 0)}
                end={vec(width - 32, 36)}
                colors={["rgba(46,51,90,0.26)", "rgba(28,27,51,0.26)"]}
              />
              <Shadow color="rgba(0, 0, 0, 1)" dx={0} dy={4} blur={4} inner />
            </RoundedRect>
          </Canvas>
          <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
            <Ionicons
              name="search"
              size={20}
              color="rgba(235, 235, 245, 0.6)"
              style={{ marginHorizontal: 8 }}
            />
            <TextInput
              placeholder="Search for a city or airport"
              placeholderTextColor="rgba(235, 235, 245, 0.6)"
              style={styles.searachInput}
            ></TextInput>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, paddingTop: 20 }}
          contentContainerStyle={{ gap: 20, paddingBottom: 100 }}
        >
          {ForecastList.map((forecast, index) => (
            <WeatherWidget key={index} forecast={forecast} />
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default WeatherList;

const styles = StyleSheet.create({
  titleStyles: {
    fontSize: 28,
    color: "#ffffff",
    marginLeft: 10,
    lineHeight: 34,
    fontFamily: "SF-regular",
  },
  searachInput: {
    fontFamily: "SF-regular",
    color: "rgba(235, 235, 245, 0.6)",
  },
});
