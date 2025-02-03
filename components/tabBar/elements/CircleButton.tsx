import React from "react";
import {
  Canvas,
  Circle,
  Line,
  LinearGradient,
  Shadow,
  vec,
} from "@shopify/react-native-skia";

interface CircleButtonProps {
  radius: number;
  pressed: boolean;
}

const CircleButton = ({ radius, pressed }: CircleButtonProps) => {
  // CircleButton component is used in TabBarItems.tsx
  const CircleDiameter = radius * 2;
  return (
    <Canvas
      style={{
        width: CircleDiameter + 2, // +2 to make sure the shadow is visible
        height: CircleDiameter + 2, // +2 to make sure the shadow is visible
      }}
    >
      <Circle cx={radius} cy={radius} r={radius}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(CircleDiameter, CircleDiameter)}
          colors={pressed ? ["#BBBFC7", "#FFFFFF"] : ["#F5F5F9", "#DADFE7"]}
        />
        <Shadow dx={1} dy={1} blur={0.5} color={"white"} />
      </Circle>
      <Line
        p1={vec(radius - radius / 3, radius)}
        p2={vec(radius + radius / 3, radius)}
        style={"stroke"}
        strokeCap={"round"}
        strokeWidth={4}
        color={"#48319D"}
      />
      <Line
        p1={vec(radius, radius - radius / 3)}
        p2={vec(radius, radius + radius / 3)}
        style={"stroke"}
        strokeCap={"round"}
        strokeWidth={4}
        color={"#48319D"}
      />
    </Canvas>
  );
};

export default CircleButton;
