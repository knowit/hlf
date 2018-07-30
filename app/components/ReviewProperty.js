import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Modal,
  Text
} from "react-native";
import SlimText from "./SlimText";
import PropTypes from "prop-types";
import { colors, COMPONENT_SPACING } from "../settings/defaultStyles";
import PropertyTitle from "./PropertyTitle";
import ReviewOptionButton from "./ReviewOptionButton";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

class ReviewProperty extends Component {
  constructor(props) {
    super(props);
    this.state = { newComment: "" };
  }

  componentDidUpdate(previousProps) {
    if (
      previousProps.currentProperty.name !== this.props.currentProperty.name
    ) {
      this.setState({ newComment: "" });
    }
  }

  render() {
    const { currentProperty, onOptionSelected } = this.props;
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
              onOptionSelected={onOptionSelected}
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
              onOptionSelected={onOptionSelected}
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
            numberOfLines={3}
            value={this.state.newComment}
            onChangeText={text => this.setState({ newComment: text })}
          />
          <TouchableHighlight
            onPress={() => onOptionSelected("comment", this.state.newComment)}
          >
            <MaterialIcons
              name="chevron-right"
              color={colors.secondaryTextColor}
              size={55}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

ReviewProperty.propTypes = {
  currentProperty: PropTypes.object.isRequired,
  onOptionSelected: PropTypes.func.isRequired
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
    fontSize: 20,
    flex: 1,
    padding: 10,
    color: colors.primaryTextColor,
    textAlignVertical: "top"
  },
  commentButton: {}
});
export default ReviewProperty;
