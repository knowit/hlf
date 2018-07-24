import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import colors from "../settings/defaultStyles";

export default () => {
  return (
    <View
      style={{
        backgroundColor: colors.primaryBackgroundColor,
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <ActivityIndicator size="large" color={colors.primaryTextColor} />
    </View>
  );
};
