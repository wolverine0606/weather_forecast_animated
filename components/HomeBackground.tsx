import {
  Image,
  ImageBackground,
  Platform,
  ScaledSize,
  StyleSheet,
  View,
} from "react-native";
import React from "react";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import useApplicationDimensions from "@/hooks/useApplicationDimensions";
import { useForecastSheetPosition } from "@/context/ForecastSheetContex";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

const HomeBackground = () => {
  const dimentions = useApplicationDimensions();
  const { width, height } = dimentions;
  const myStyles = styles(dimentions);

  const smokeHeight = height * 0.6;
  const smokeOffsetY = height * 0.4;

  const animatedPosition = useForecastSheetPosition();

  const leftBgColor = useSharedValue("#2E335A");
  const rightBgColor = useSharedValue("#1C1B33");

  const bgColor = useDerivedValue(() => {
    if (Platform.OS === "ios") {
      leftBgColor.value = interpolateColor(
        animatedPosition.value,
        [0, 1],
        ["#2E335A", "#422E52"]
      );
    } else {
      leftBgColor.value = animatedPosition.value > 0.5 ? "#422E52" : "#2E335A";
    }
    return [leftBgColor.value, rightBgColor.value];
  });

  const AnimatedImgBg = Animated.createAnimatedComponent(ImageBackground);
  const animatedImgBgStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            animatedPosition.value,
            [0, 1],
            [0, -height],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const animatedSmokeOpacity = useDerivedValue(() => {
    return interpolate(
      animatedPosition.value,
      [0, 0.1],
      [1, 0],
      Extrapolation.CLAMP
    );
  });

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <Canvas style={{ flex: 1, ...StyleSheet.absoluteFillObject }}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={bgColor}
          />
        </Rect>
      </Canvas>
      <AnimatedImgBg
        source={require("../assets/home/Background.png")}
        resizeMode="cover"
        style={[animatedImgBgStyles, { height: "100%" }]}
      >
        <Canvas
          style={[
            {
              height: smokeHeight,
              top: smokeOffsetY,
            },
          ]}
        >
          <Rect
            x={0}
            y={0}
            width={width}
            height={smokeHeight}
            opacity={animatedSmokeOpacity}
          >
            <LinearGradient
              start={vec(width / 2, 0)}
              end={vec(width / 2, smokeHeight)}
              colors={["rgba(58,63,84,0)", "rgba(58,63,84,1)"]}
              positions={[-0.02, 0.54]}
            />
          </Rect>
        </Canvas>
        <Image
          source={require("../assets/home/House.png")}
          resizeMode="cover"
          style={myStyles.houseImage}
        />
      </AnimatedImgBg>
    </View>
  );
};

export default HomeBackground;

const styles = ({ width }: ScaledSize) =>
  StyleSheet.create({
    houseImage: {
      height: width,
      width,
      ...StyleSheet.absoluteFillObject,
      top: "36%",
    },
  });
