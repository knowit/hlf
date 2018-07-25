import colors from "./defaultStyles";
import React from "react";
import Entypo from "react-native-vector-icons/Entypo";

export const positiveIcon = (visible, size) => {
  return (
    <Entypo
      name="thumbs-up"
      size={size}
      color={colors.positiveColor}
      style={{ opacity: visible ? 1 : 0 }}
    />
  );
};

export const negativeIcon = (visible, size) => {
  return (
    <Entypo
      name="thumbs-down"
      size={size}
      color={colors.negativeColor}
      style={{ opacity: visible ? 1 : 0 }}
    />
  );
};

export const infoIcon = size => {
  return (
    <Entypo
      name="info-with-circle"
      size={size}
      color={colors.secondaryTextColor}
    />
  );
};
