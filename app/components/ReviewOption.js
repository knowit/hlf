import React from "react";
import { TouchableHighlight, StyleSheet } from "react-native";
import AppText from "./AppText";
import colors, {
  BORDER_RADIUS,
  COMPONENT_SPACING
} from "../settings/defaultStyles";

export default ({ children, onPress, color }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[styles.default, { borderColor: styles[color] }]}
    >
      <AppText type={color} size="xlarge">
        {children}
      </AppText>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  positive: {
    borderColor: colors.positiveColor
  },
  negative: {
    borderColor: colors.negativeColor
  },
  secondary: {
    borderColor: colors.secondaryTextColor
  },
  default: {
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    borderColor: colors.transparentColor,
    paddingHorizontal: COMPONENT_SPACING,
    paddingVertical: COMPONENT_SPACING / 3
  }
});
