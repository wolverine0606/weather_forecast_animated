import { createContext, useContext } from "react";
import { SharedValue, useSharedValue } from "react-native-reanimated";

interface ForecastSheetContextProps {
  children: React.ReactNode;
}

export const ForecastSheetContext = createContext<SharedValue<number> | null>(
  null
);

export const ForecastSheetProvider = ({
  children,
}: ForecastSheetContextProps) => {
  const animatedPosition = useSharedValue(0);
  return (
    <ForecastSheetContext.Provider value={animatedPosition}>
      {children}
    </ForecastSheetContext.Provider>
  );
};

export const useForecastSheetPosition = (): SharedValue<number> => {
  const context = useContext(ForecastSheetContext);
  if (context === null) {
    throw new Error(
      "useForecastSheetPosition must be used within ForecastSheetProvider"
    );
  }
  return context;
};
