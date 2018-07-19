import React from "react";
import { StyleSheet, View, TextInput, TouchableHighlight } from "react-native";
import SlimText from "./SlimText";
import PropTypes from "prop-types";
import { colors, COMPONENT_SPACING } from "../settings/defaultStyles";
import PropertyTitle from "./PropertyTitle";
import ReviewOptionButton from "./ReviewOptionButton";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ReviewProperty = ({ currentProperty, onReviewAction }) => {
  const { value } = currentProperty;
  return (
    <View style={styles.container}>
      <View style={styles.upper}>
        <PropertyTitle
          property={currentProperty}
          size={25}
          style={{ justifyContent: "center" }}
        />
        <SlimText style={styles.desc}>{currentProperty.description}</SlimText>
        <View style={styles.buttonRow}>
          <ReviewOptionButton
            buttonValue={-1}
            selectedValue={value}
            onReviewAction={onReviewAction}
          />
          <MaterialIcons
            name="info-outline"
            size={30}
            color={colors.primaryTextColor}
            style={styles.infoIcon}
          />
          <ReviewOptionButton
            buttonValue={1}
            selectedValue={value}
            onReviewAction={onReviewAction}
          />
        </View>
      </View>
      <View style={styles.lower}>
        <TextInput
          placeholder="Skriv en kommentar..."
          style={styles.commentInput}
          underlineColorAndroid={colors.transparentColor}
          placeholderTextColor={colors.secondaryTextColor}
          multiline={true}
        />
        <TouchableHighlight>
          <MaterialIcons
            name="chevron-right"
            color={colors.secondaryTextColor}
            size={55}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
};

ReviewProperty.propTypes = {
  currentProperty: PropTypes.object.isRequired,
  onReviewAction: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondaryBackgroundColor,
    alignItems: "stretch",
    borderRadius: 20,
    overflow: "hidden",
    flex: 1
  },
  upper: {
    padding: COMPONENT_SPACING
  },
  desc: {
    marginVertical: COMPONENT_SPACING,
    fontSize: 20,
    textAlign: "center"
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  infoIcon: {
    marginHorizontal: 40
  },
  lower: {
    flexDirection: "row",
    backgroundColor: colors.tertiaryBackgroundColor
  },
  commentInput: {
    flex: 1
  },
  commentButton: {}
});
export default ReviewProperty;
