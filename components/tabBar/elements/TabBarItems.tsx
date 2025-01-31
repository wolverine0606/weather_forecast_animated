import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapIcon from "../icons/MapIcon";
import ListIcon from "../icons/ListIcon";
import TrapezoidBackground from "./TrapezoidBackground";

const TabBarItems = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        alignItems: "center",
      }}
    >
      <MapIcon />
      <TrapezoidBackground />
      <ListIcon />
    </View>
  );
};

export default TabBarItems;

const styles = StyleSheet.create({});
