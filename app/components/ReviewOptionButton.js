import React from "react";
import { TouchableHighlight, StyleSheet, View } from "react-native";
import colors, {
  BORDER_RADIUS,
  COMPONENT_SPACING
} from "../settings/defaultStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SlimText from "./SlimText";

export default ({ buttonValue, selectedValue, onOptionSelected }) => {
  const isPositive = buttonValue;
  const isSelected = buttonValue === selectedValue;

  const color =
    selectedValue === undefined
      ? colors.primaryTextColor
      : buttonValue !== selectedValue
        ? colors.secondaryTextColor
        : isPositive
          ? colors.positiveColor
          : colors.negativeColor;
  return (
    <TouchableHighlight
      onPress={() => onOptionSelected("value", !isSelected ? buttonValue : 0)}
      style={{ flex: 1 }}
    >
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
          size={23}
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
    justifyContent: "center",
    backgroundColor: colors.tertiaryBackgroundColor,
    borderRadius: 10,
    borderWidth: 2,
    flex: 1,
    height: 55
  },
  innerElement: {
    marginHorizontal: 7
  }
});
