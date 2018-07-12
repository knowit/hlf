import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { NEW_REVIEW_SCREEN, REVIEW_SCREEN } from "../containers/VenueDetails";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../settings/defaultStyles";
import AppText from "./AppText";

export default ({ onScreenChange, currentScreen }) => {
  const screens = [
    {
      name: REVIEW_SCREEN,
      icon: <MaterialCommunityIcons name="pencil" />
    },
    {
      name: NEW_REVIEW_SCREEN,
      icon: <MaterialCommunityIcons name="star" />
    }
  ];

  return (
    <View style={styles.container}>
      {screens.map(screen => {
        return (
          <TouchableHighlight
            onPress={() => onScreenChange(screen.name)}
            style={[
              screen.name === currentScreen
                ? styles.selectedOption
                : styles.unselectedOption,
              styles.menuComponent
            ]}
            key={screen.name}
          >
            <AppText type="primary" size="large">
              {screen.icon} {screen.name}
            </AppText>
          </TouchableHighlight>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%"
  },
  menuComponent: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10
  },
  selectedOption: {},
  unselectedOption: {
    backgroundColor: colors.secondaryBackgroundColor
  }
});
