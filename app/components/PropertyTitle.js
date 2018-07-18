import React from "react";
import { Text, View, Platform } from "react-native";
import { colors } from "../settings/defaultStyles";

export default ({ property, size }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
      {React.cloneElement(property.icon, {
        color: colors.primaryTextColor,
        size: size
      })}
      <Text
        style={{
          marginLeft: size / 2,
          color: colors.primaryTextColor,
          fontSize: size,
          fontFamily:
            Platform.OS === "android" ? "sans-serif-light" : undefined,
          letterSpacing: 1
        }}
      >
        {property.name}
      </Text>
    </View>
  );
};
