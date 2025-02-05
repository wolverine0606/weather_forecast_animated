import { ScaledSize, useWindowDimensions, StatusBar } from "react-native";

const useApplicationDimensions = () => {
  const { width, height, scale, fontScale } = useWindowDimensions();
  return {
    width,
    height: height + (StatusBar?.currentHeight || 0),
    scale,
    fontScale,
    PADDING_HORISONTAL: width * 0.08,
  };
};

export default useApplicationDimensions;
