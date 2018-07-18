import { Text, Platform } from "react-native";
import colors from "../settings/defaultStyles";
import React from "react";

export default props => {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily:
            Platform.OS === "android" ? "sans-serif-light" : undefined,
          color: colors.primaryTextColor
        },
        props.style
      ]}
    >
      {props.children}
    </Text>
  );
};
