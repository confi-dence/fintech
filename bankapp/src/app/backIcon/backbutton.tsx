import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";

import ArrowLeftIcon from "./arrow-left-icon";
// router.navigate('/(guarded)/(tab)/profile');

export const BackButton = ({
  style,
  action,
}: {
  style?: ViewStyle;
  action?: () => void;
}) => {
  const router = useRouter();

  return router.canGoBack() ? (
    <TouchableOpacity
      onPress={() => {
        if (action) {
          action();
          return;
        }
        router.back();
      }}
      style={[
        {
          backgroundColor: "#f4f4f4",
          borderRadius: 40,
          padding: 15,
          alignSelf: "flex-start",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
          marginTop: 10,
        },
        style,
      ]}
    >
      <ArrowLeftIcon color="#1E1E2D" />
    </TouchableOpacity>
  ) : null;
};

export default BackButton;
