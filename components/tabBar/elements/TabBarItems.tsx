import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import MapIcon from "../icons/MapIcon";
import ListIcon from "../icons/ListIcon";
import TrapezoidBackground from "./TrapezoidBackground";
import useApplicationDimensions from "@/hooks/useApplicationDimensions";
import CircleButton from "./CircleButton";
import { useAppNavigation } from "@/utils/useAppNavigation";

const TabBarItems = () => {
  const { height, width, PADDING_HORISONTAL } = useApplicationDimensions();
  const TrapezoidHeight = height * 0.12;
  const TrapezoidWidth = width * 0.68;
  const CircleRadius = (TrapezoidHeight * 0.51) / 2;
  const buttonCenterX = width / 2 - CircleRadius;

  const nav = useAppNavigation();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: PADDING_HORISONTAL,

        alignItems: "center",
      }}
    >
      <MapIcon />
      <TrapezoidBackground height={TrapezoidHeight} width={TrapezoidWidth} />
      <Pressable
        style={{
          ...StyleSheet.absoluteFillObject,
          left: buttonCenterX,
          top: 12,
          width: CircleRadius * 2,
          height: CircleRadius * 2,
        }}
      >
        {({ pressed }) => (
          <CircleButton radius={CircleRadius} pressed={pressed} />
        )}
      </Pressable>
      <Pressable onPress={() => nav.navigate("WeatherList")}>
        <ListIcon />
      </Pressable>
    </View>
  );
};

export default TabBarItems;

const styles = StyleSheet.create({});
