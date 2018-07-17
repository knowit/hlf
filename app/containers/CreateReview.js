import React, { Component } from "react";
import { View, TouchableHighlight, StyleSheet, TextInput } from "react-native";
import HorizontalRuler from "../components/HorizontalRuler";
import properties from "../settings/propertyConfig";
import colors, {
  COMPONENT_SPACING,
  BORDER_RADIUS
} from "../settings/defaultStyles";
import Entypo from "react-native-vector-icons/Entypo";
import AppText from "../components/AppText";
import Ionicons from "react-native-vector-icons/Ionicons";
import ViewContainer from "../components/ViewContainer";
import AppButton from "../components/AppButton";
import ReviewOption from "../components/ReviewOption";
import ReviewProperty from "../components/ReviewProperty";

export default class CreateReview extends Component {
  constructor(props) {
    super(props);
    this.state = this.resetInputValues();
    this.onPropertyValueChange = this.onPropertyValueChange.bind(this);
  }
  render() {
    return (
      <ViewContainer heightAdjusting="auto">
        {properties.map(property => (
          <ReviewProperty property={property} key={property.name} />
        ))}
      </ViewContainer>
    );
  }

  onPropertyValueChange(propertyName, selected) {
    const newValue =
      this.state[propertyName].value === selected ? undefined : selected;

    const nextState = { ...this.state[propertyName], value: newValue };
    this.setState({ [propertyName]: nextState });
  }

  onCommentChange(propertyName, text) {
    const nextState = { ...this.state[propertyName], comment: text };
    this.setState({ [propertyName]: nextState });
  }

  resetInputValues() {
    return properties
      .map(property => {
        return {
          name: property.name,
          value: undefined,
          comment: ""
        };
      })
      .reduce((obj, item) => {
        obj[item.name] = item;
        return obj;
      }, {});
  }
}

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: COMPONENT_SPACING,
    padding: COMPONENT_SPACING
  },
  infoIcon: {
    marginHorizontal: COMPONENT_SPACING / 2
  },
  textArea: {
    backgroundColor: colors.secondaryBackgroundColor,
    borderRadius: BORDER_RADIUS,
    textAlignVertical: "top",
    fontSize: 19,
    padding: 10,
    color: colors.primaryTextColor,
    borderWidth: 1,
    borderColor: colors.primaryTextColor
  }
});
