import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Canvas,
  LinearGradient,
  Path,
  RoundedRect,
  vec,
} from "@shopify/react-native-skia";
import { BlurView } from "expo-blur";

interface ForecastSheetBackgroundProps {
  width: number;
  height: number;
  cornerRadius: number;
}

const ForecastSheetBackground = ({
  width,
  height,
  cornerRadius,
}: ForecastSheetBackgroundProps) => {
  const path = `M 0 ${cornerRadius} 
                A ${cornerRadius} ${cornerRadius} 0 0 1 ${cornerRadius} 0
                H ${width - cornerRadius}
                A ${cornerRadius} ${cornerRadius} 0 0 1 ${width} ${cornerRadius}`;
  return (
    <BlurView
      style={[
        StyleSheet.absoluteFillObject,
        { borderRadius: cornerRadius, overflow: "hidden" },
      ]}
      intensity={50}
      tint="dark"
    >
      <Canvas style={{ flex: 1 }}>
        <RoundedRect x={0} y={0} width={width} height={height} r={cornerRadius}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={["rgba(46,51,90,0.26)", "rgba(28,57,51,0.26)"]}
            positions={[-0.04, 0.95]}
          ></LinearGradient>
        </RoundedRect>
        <Path
          path={path}
          style={"stroke"}
          strokeWidth={2}
          color={"rgba(117, 130, 244, 0.5)"}
        >
          <LinearGradient
            start={vec(width / 2, 0)}
            end={vec(width / 2, cornerRadius)}
            colors={["white", "transperent"]}
          ></LinearGradient>
        </Path>
      </Canvas>
    </BlurView>
  );
};

export default ForecastSheetBackground;

const styles = StyleSheet.create({});
