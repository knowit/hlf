import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import PropertyOverview from "./PropertyOverview";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import colors, { COMPONENT_SPACING } from "../settings/defaultStyles";
import AppText from "./AppText";
import ViewContainer from "./ViewContainer";

export default ({ selectedVenue, showDetails }) => {
  return (
    <ViewContainer heightAdjusting="auto" opaque={true}>
      <View style={styles.header}>
        <AppText type="primary" size="large">
          {selectedVenue.name}
        </AppText>
        <TouchableHighlight onPress={showDetails}>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={40}
            color={colors.primaryTextColor}
          />
        </TouchableHighlight>
      </View>
      <AppText type="secondary" size="medium">
        {selectedVenue.formatted_address}
      </AppText>
      <PropertyOverview reviewSummary={selectedVenue.reviews} />
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  }
});
