import React from "react";
import { Text, StyleSheet, View, TouchableHighlight, Al } from "react-native";
import PropTypes from "prop-types";
import colors, { sizes } from "../settings/defaultStyles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const TextNode = ({ type, size, children, style, alignment }) => {
  if (typeof children === "string") {
    return (
      <Text
        style={[
          { fontSize: sizes[size] },
          styles[type],
          alignment ? { textAlign: alignment } : {},
          style
        ]}
      >
        {children}
      </Text>
    );
  } else {
    const elements = children.map !== undefined ? children : [children];
    let nextId = 0;
    const iconSize = sizes[size];
    const iconColor = StyleSheet.flatten(styles[type]).color;

    const output = elements.map(child => {
      if (typeof child === "string") {
        return (
          <Text
            key={nextId++}
            style={[{ fontSize: sizes[size] }, styles[type]]}
          >
            {child}
          </Text>
        );
      } else {
        return React.cloneElement(child, {
          color: iconColor,
          size: iconSize,
          key: nextId++
        });
      }
    });
    return (
      <View
        style={[
          styles.textWrap,
          alignment ? viewAlignMent[alignment] : {},
          style
        ]}
      >
        {output}
      </View>
    );
  }
};

const viewAlignMent = {
  left: { justifyContent: "flex-start" },
  center: { justifyContent: "center" },
  right: { justifyContent: "flex-end" }
};

export default TextNode;

const styles = StyleSheet.create({
  textWrap: {
    flexDirection: "row",
    alignItems: "center"
  },
  inverse: {
    color: colors.primaryBackgroundColor
  },
  primary: {
    color: colors.primaryTextColor
  },
  secondary: {
    color: colors.secondaryTextColor
  },
  positive: {
    color: colors.positiveColor
  },
  negative: {
    color: colors.negativeColor
  }
});

TextNode.propTypes = {
  type: PropTypes.oneOf([
    "inverse",
    "primary",
    "secondary",
    "positive",
    "negative"
  ]).isRequired,
  size: PropTypes.oneOf(["xlarge", "large", "medium", "small"]),
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]), // Todo, sjekk om det er overlapp ref toggle comments på review,
  alignment: PropTypes.oneOf(["left", "center", "right"])
};
