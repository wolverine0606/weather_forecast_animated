import { StyleSheet } from "react-native";
import React from "react";
import {
  Canvas,
  Rect,
  LinearGradient,
  vec,
  AnimatedProp,
  Color,
} from "@shopify/react-native-skia";
import useApplicationDimensions from "@/hooks/useApplicationDimensions";

interface BackgroundGradientProps {
  colors?: AnimatedProp<Color[]>;
}

const BackgroundGradient = ({
  colors = ["#2E335A", "#1C1B33"],
}: BackgroundGradientProps) => {
  const { width, height } = useApplicationDimensions();
  return (
    <Canvas style={{ flex: 1, ...StyleSheet.absoluteFillObject }}>
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(width, height)}
          colors={colors}
        />
      </Rect>
    </Canvas>
  );
};

export default BackgroundGradient;
