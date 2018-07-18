import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import PropertyOverview from "./PropertyOverview";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import colors, { COMPONENT_SPACING } from "../settings/defaultStyles";
import ViewContainer from "./ViewContainer";

export default ({ selectedVenue, showDetails }) => {
  return (
    <ViewContainer opaque={true}>
      <View style={styles.header}>
        <Text style={styles.name} numberOfLines={2}>
          {selectedVenue.name}
        </Text>

        <TouchableHighlight onPress={showDetails}>
          <Text>
            <MaterialIcons
              name="arrow-forwardr"
              size={40}
              color={colors.primaryTextColor}
            />
          </Text>
        </TouchableHighlight>
      </View>
      <Text style={styles.address} numberOfLines={1}>
        {selectedVenue.formatted_address}
      </Text>
      <PropertyOverview reviewSummary={selectedVenue.reviews} />
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  name: {
    color: colors.primaryTextColor,
    fontSize: 22,
    flex: 1,
    maxHeight: 60,
    fontWeight: "500"
  },
  address: {
    color: colors.primaryTextColor,
    fontSize: 16,
    marginBottom: COMPONENT_SPACING
  }
});
