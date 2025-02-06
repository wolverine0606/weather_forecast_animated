import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export const useAppNavigation = () =>
  useNavigation<StackNavigationProp<ParamListBase>>();
