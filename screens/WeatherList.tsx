import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BackgroundGradient from "@/components/BackgroundGradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAppNavigation } from "@/utils/useAppNavigation";
import useApplicationDimensions from "@/hooks/useApplicationDimensions";

const WeatherList = () => {
  const { top } = useSafeAreaInsets();
  const nav = useAppNavigation();
  const { PADDING_HORISONTAL } = useApplicationDimensions();
  return (
    <>
      <BackgroundGradient />
      <View style={{ paddingTop: top + 2, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: PADDING_HORISONTAL / 2,
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
});
