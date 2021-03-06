import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import colors from "../settings/defaultStyles";
import propTypes from "prop-types";

const Loading = ({ inline, style }) => {
  return (
    <View
      style={[
        {
          backgroundColor: colors.primaryBackgroundColor,
          justifyContent: "center",
          alignItems: "center"
        },
        style,
        !inline ? { ...StyleSheet.absoluteFillObject } : { flex: 1 }
      ]}
    >
      <ActivityIndicator size="large" color={colors.primaryTextColor} />
    </View>
  );
};

Loading.propTypes = {
  inline: propTypes.bool,
  style: propTypes.oneOfType([propTypes.array, propTypes.object])
};

export default Loading;
