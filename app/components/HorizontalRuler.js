import React from "react";
import { View } from "react-native";
import colors, { COMPONENT_SPACING } from "../settings/defaultStyles";
import propTypes from "prop-types";

const HorizontalBar = ({ verticalMargin, style }) => {
  return (
    <View
      style={[
        {
          borderBottomColor: colors.secondaryTextColor,
          borderBottomWidth: 1,
          marginHorizontal: COMPONENT_SPACING * -1,
          marginVertical: verticalMargin
        },
        style
      ]}
    />
  );
};

HorizontalBar.propTypes = {
  verticalMargin: propTypes.number,
  style: propTypes.oneOfType([propTypes.array, propTypes.object])
};

export default HorizontalBar;
