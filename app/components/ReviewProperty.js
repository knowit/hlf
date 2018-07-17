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
export default class ReviewProperty extends Component {
  render() {
    const { name, icon } = this.props.property;
    return (
      <ViewContainer
        heightAdjusting="auto"
        style={StyleSheet.flatten(styles.container)}
      >
        <View style={styles.headerRow}>
          <AppText type="primary" size="large">
            {icon} {name}
          </AppText>
          <MaterialCommunityIcons
            name="information"
            color={colors.primaryTextColor}
            size={sizes.large}
          />
        </View>

        <AppText type="primary" />
      </ViewContainer>
    );
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
