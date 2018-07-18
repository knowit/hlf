import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import ViewContainer from "./ViewContainer";
import AppText from "../components/AppText";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  COMPONENT_SPACING,
  colors,
  BORDER_RADIUS,
  sizes
} from "../settings/defaultStyles";
import ReviewOption from "./ReviewOption";

export default class ReviewProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: Math.round(Math.random()) === 0,
      showComment: false,
      comment: ""
    };
  }

  render() {
    const { name, icon, description } = this.props.property;
    const { isSelected } = this.state;

    return (
      <ViewContainer
        heightAdjusting="auto"
        style={StyleSheet.flatten(styles.container)}
      >
        <View style={styles.row}>
          <AppText type="primary" size="large">
            {icon} {name}
          </AppText>
          <MaterialCommunityIcons
            name="information"
            color={colors.primaryTextColor}
            size={sizes.large}
          />
        </View>
        <AppText type="primary">{description}</AppText>
        <View style={styles.row}>
          <ReviewOption
            color={isSelected == 1 ? "positive" : "primary"}
            onPress={() => this.onSelectionInput(1)}
          >
            JA
          </ReviewOption>

          <ReviewOption
            color={isSelected == 0 ? "negative" : "primary"}
            onPress={() => this.onSelectionInput(0)}
          >
            Nei
          </ReviewOption>
        </View>
      </ViewContainer>
    );
  }

  onSelectionInput(value) {
    if (this.state.isSelected === value) {
      this.setState({ isSelected: undefined });
    } else {
      this.setState({ isSelected: value });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondaryBackgroundColor,
    borderRadius: BORDER_RADIUS * 2,
    borderColor: colors.secondaryTextColor,
    borderWidth: 1,
    marginBottom: COMPONENT_SPACING * 2
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
