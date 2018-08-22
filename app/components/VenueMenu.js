import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { NEW_REVIEW_SCREEN, REVIEW_SCREEN } from "../containers/VenueDetails";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import colors from "../settings/defaultStyles";
import SlimText from "./SlimText";

const FONT_SIZE = 20;
export default ({ onScreenChange, currentScreen }) => {
  const screens = [
    {
      name: REVIEW_SCREEN,
      icon: "star"
    },
    {
      name: NEW_REVIEW_SCREEN,
      icon: "create"
    }
  ];
  return (
    <View style={styles.container}>
      {screens.map(screen => {
        const isSelected = screen.name === currentScreen;
        return (
          <TouchableHighlight
            onPress={() => onScreenChange(screen.name)}
            style={[
              isSelected ? {} : styles.unselectedOption,
              styles.menuComponent
            ]}
            key={screen.name}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons
                name={screen.icon}
                color={colors.primaryTextColor}
                size={FONT_SIZE}
              />
              <SlimText
                style={{
                  fontSize: FONT_SIZE,
                  fontWeight: isSelected ? "bold" : "normal"
                }}
              >
                {screen.name}
              </SlimText>
            </View>
          </TouchableHighlight>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  menuComponent: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10
  },

  unselectedOption: {
    backgroundColor: colors.secondaryBackgroundColor
  }
});
