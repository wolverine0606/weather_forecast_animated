import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Widget, { WidgetDimensionsProps } from "./base/Widget";
import { FontAwesome5 } from "@expo/vector-icons";

const FeelsLikeWidget = ({ width, height }: WidgetDimensionsProps) => {
  return (
    <Widget width={width} height={height}>
      <Widget.Header
        contentText="Feels Like"
        Icon={FontAwesome5}
        iconProps={{ name: "temperature-high" }}
      />
      <Widget.Body contentText={`19°`} contentSize="Large"></Widget.Body>
      <Widget.Footer contentText="Similar to the actual temperature." />
    </Widget>
  );
};

export default FeelsLikeWidget;
