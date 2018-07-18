import React from "react";
import { StyleSheet, View } from "react-native";

import SlimText from "./SlimText";
import PropTypes from "prop-types";
import { colors, COMPONENT_SPACING } from "../settings/defaultStyles";
import PropertyTitle from "./PropertyTitle";
import ReviewOptionButton from "./ReviewOptionButton";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ReviewProperty = ({ propertyDescription, value, comment }) => {
  return (
    <View style={styles.container}>
      <PropertyTitle
        property={propertyDescription}
        size={25}
        style={{ justifyContent: "center" }}
      />
      <SlimText style={styles.desc}>{propertyDescription.description}</SlimText>
      <View style={styles.buttonRow}>
        <ReviewOptionButton buttonValue={-1} selectedValue={value} />
        <ReviewOptionButton buttonValue={1} selectedValue={value} />
      </View>
    </View>
  );
};

ReviewProperty.propTypes = {
  propertyDescription: PropTypes.object.isRequired,
  value: PropTypes.oneOf([1, 0, -1]).isRequired,
  comment: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondaryBackgroundColor,
    alignItems: "stretch",
    borderRadius: 20,
    padding: COMPONENT_SPACING
  },
  desc: {
    marginVertical: COMPONENT_SPACING,
    fontSize: 20,
    textAlign: "center"
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
export default ReviewProperty;
