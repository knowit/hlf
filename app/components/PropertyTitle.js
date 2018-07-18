import React from "react";
import { View } from "react-native";
import { colors } from "../settings/defaultStyles";
import SlimText from "./SlimText";
import PropTypes from "prop-types";
const PropertyTitle = ({ property, size, flex }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        flex: flex || flex == undefined ? 1 : 0
      }}
    >
      {React.cloneElement(property.icon, {
        color: colors.primaryTextColor,
        size: size * 1.2
      })}
      <SlimText
        style={{
          marginLeft: size / 2,
          fontSize: size,
          letterSpacing: 1
        }}
      >
        {property.name}
      </SlimText>
    </View>
  );
};

PropertyTitle.propTypes = {
  property: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired,
  flex: PropTypes.bool
};

export default PropertyTitle;
