import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import colors from "../settings/defaultStyles";

export default ({ inline }) => {
  return (
    <View
      style={[
        {
          backgroundColor: colors.primaryBackgroundColor,
          justifyContent: "center",
          alignItems: "center"
        },
        !inline ? { ...StyleSheet.absoluteFillObject } : { flex: 1 }
      ]}
    >
      <ActivityIndicator size="large" color={colors.primaryTextColor} />
    </View>
  );
};
