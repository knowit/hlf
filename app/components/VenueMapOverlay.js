import React from "react";
import { View, TouchableHighlight } from "react-native";
import PropertyOverview from "./PropertyOverview";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import colors, { COMPONENT_SPACING } from "../settings/defaultStyles";
import ViewContainer from "./ViewContainer";
import VenueContactInfo from "./VenueContactInfo";

export default ({ selectedVenue, showDetails }) => {
  return (
    <ViewContainer opaque={true}>
      <View style={{ flexDirection: "row", marginBottom: COMPONENT_SPACING }}>
        <VenueContactInfo
          name={selectedVenue.name}
          formatted_address={selectedVenue.formatted_address}
          style={{ flex: 1 }}
        />
        <TouchableHighlight onPress={showDetails}>
          <MaterialIcons
            name="arrow-forward"
            size={40}
            color={colors.primaryTextColor}
          />
        </TouchableHighlight>
      </View>
      <PropertyOverview reviewSummary={selectedVenue.reviews} />
    </ViewContainer>
  );
};
