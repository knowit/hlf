import React from "react";
import { TouchableHighlight, StyleSheet, View } from "react-native";
import colors, {
  BORDER_RADIUS,
  COMPONENT_SPACING
} from "../settings/defaultStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SlimText from "./SlimText";

export default ({ buttonValue, selectedValue, onPress }) => {
  const isPositive = buttonValue === 1;
  const isSelected = buttonValue === selectedValue;

  const color = !selectedValue
    ? colors.primaryTextColor
    : buttonValue !== selectedValue
      ? colors.secondaryTextColor
      : isPositive
        ? colors.positiveColor
        : colors.negativeColor;
  return (
    <TouchableHighlight onPress={onPress}>
      <View
        style={[
          styles.wrap,
          {
            backgroundColor: isSelected
              ? colors.primaryBackgroundColor
              : colors.tertiaryBackgroundColor,
            borderColor: isSelected ? color : colors.transparentColor
          }
        ]}
      >
        <SlimText style={[styles.innerElement, { fontSize: 20, color: color }]}>
          {isPositive ? "JA" : "NEI"}
        </SlimText>
        <MaterialIcons
          name={`thumb-${isPositive ? "up" : "down"}`}
          style={[styles.innerElement]}
          size={20}
          color={color}
        />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.tertiaryBackgroundColor,
    margin: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 2
  },
  innerElement: {
    marginHorizontal: 7
  }
});
