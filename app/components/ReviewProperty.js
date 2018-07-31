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
    this.onReviewSubmit = this.onReviewSubmit.bind(this);
  }

  componentDidUpdate(previousProps) {
    if (
      previousProps.currentProperty.name !== this.props.currentProperty.name
    ) {
      this.setState({ newComment: "" });
    }
  }

  render() {
    const { currentProperty } = this.props;
    const cons = Object.assign({}, currentProperty);
    delete cons.icon;
    delete cons.longDescription;
    //console.log(cons);
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
              buttonValue={false}
              selectedValue={value}
              onOptionSelected={this.onReviewSubmit}
            />
            <MaterialIcons
              name="info-outline"
              size={30}
              color={colors.primaryTextColor}
              style={styles.infoIcon}
            />
            <ReviewOptionButton
              buttonValue={true}
              selectedValue={value}
              onOptionSelected={this.onReviewSubmit}
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
          <TouchableHighlight onPress={() => this.onReviewSubmit("comment")}>
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

  onReviewSubmit(source, newValue) {
    const comment = this.state.newComment;
    const value =
      source === "value" ? newValue : this.props.currentProperty.value;
    const body = {
      kommentar: comment,
      rangering: value === undefined ? null : value
    };
    this.props.onReviewSubmit(body);
  }
}

ReviewProperty.propTypes = {
  currentProperty: PropTypes.object.isRequired,
  onReviewSubmit: PropTypes.func.isRequired
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
