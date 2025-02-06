import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";

const BasicAnimation = () => {
  const size = 200;
  const scale = useSharedValue(1);
  const borderRadius = useSharedValue(0);
  const squareCircle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateY: interpolate(borderRadius.value, [0, 1], [-300, 100]) },
      ],
      borderRadius: borderRadius.value * size,
    };
  });

  useEffect(() => {
    scale.value = withRepeat(withSpring(2), -1, true);
    borderRadius.value = withRepeat(withSpring(1), -1, true);
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Animated.View
        style={[
          {
            width: size,
            height: size,
            backgroundColor: "red",
          },
          squareCircle,
        ]}
      ></Animated.View>
    </View>
  );
};

export default BasicAnimation;

const styles = StyleSheet.create({});
