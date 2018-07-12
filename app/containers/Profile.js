import React, { Component } from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import HorizontalRuler from "../components/HorizontalRuler";
import { COMPONENT_SPACING } from "../settings/defaultStyles";
import AppText from "../components/AppText";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ViewContainer from "../components/ViewContainer";
import { AppButton } from "../components/AppButton";

const demo = [
  "Operahuset i Oslo",
  "Vitus Apotek Storgata",
  "Deichmanske Bibliotek"
];

export default class extends Component {
  render() {
    return (
      <ViewContainer
        heightAdjusting="flex"
        opaque={true}
        style={{ paddingBottom: 0 }}
      >
        <AppText type="primary" size="large">
          Navn Navnesen
        </AppText>
        <AppText type="secondary" size="medium">
          epost@epost.com
        </AppText>

        <HorizontalRuler verticalMargin={COMPONENT_SPACING} />
        <AppText type="primary" size="xlarge">
          <MaterialCommunityIcons name="comment-text-outline" />Dine vurderinger
        </AppText>
        <ViewContainer
          heightAdjusting="flex"
          scrollable={true}
          transparent={true}
          style={{ padding: 0 }}
        >
          {demo.map((item, index) => (
            <AppText key={index} type="primary" size="medium">
              {item}
            </AppText>
          ))}
        </ViewContainer>
        <HorizontalRuler />
        <AppButton onPress={() => console.log("logout")}>
          <MaterialCommunityIcons name="logout" /> Logg ut
        </AppButton>
      </ViewContainer>
    );
  }
}
