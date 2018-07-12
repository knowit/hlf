import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./AppText";
import { COMPONENT_SPACING } from "../settings/defaultStyles";
import HorizontalRuler from "./HorizontalRuler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ViewContainer from "./ViewContainer";

export default ({ selectedVenue }) => {
  return (
    <ViewContainer heightAdjusting="auto" style={{ paddingBottom: 0 }}>
      <AppText type="primary" size="large">
        {selectedVenue.name}
      </AppText>
      {selectedVenue.formatted_address ? (
        <AppText type="secondary" size="small">
          {selectedVenue.formatted_address}
        </AppText>
      ) : null}
      {selectedVenue.formatted_phone_number ? (
        <AppText type="primary" size="medium">
          <MaterialCommunityIcons name="phone" />
          {selectedVenue.formatted_phone_number}
        </AppText>
      ) : null}
      <HorizontalRuler verticalMargin={20} />
    </ViewContainer>
  );
};
