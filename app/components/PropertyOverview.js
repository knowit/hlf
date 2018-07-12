import React from "react";
import { View, StyleSheet } from "react-native";
import properties from "../settings/propertyConfig";
import colors, { sizes, BORDER_RADIUS } from "../settings/defaultStyles";
import AppText from "./AppText";
import { positiveIcon, negativeIcon } from "../settings/icons";

export default ({ venueProperties }) => {
  return (
    <View>
      {properties.map(property =>
        renderProperty(property, Math.random() * 100)
      )}
    </View>
  );
};

const renderProperty = (property, value) => {
  const { name, icon } = property;
  const isSet = Math.round(Math.random());
  return (
    <View key={name} style={styles.property}>
      <AppText type="primary" size="medium" style={{ flex: 1 }}>
        {icon} {name}
      </AppText>

      {isSet ? (
        valueBar(value)
      ) : (
        <AppText type="primary" size="medium">
          Ingen vurderinger
        </AppText>
      )}
    </View>
  );
};

const valueBar = value => {
  const isPositive = value >= 50;
  return (
    <View style={{ flexDirection: "row" }}>
      {positiveIcon(isPositive, sizes.large)}
      <View style={styles.barWrap}>
        <View style={styles.barContainer}>
          <View style={[{ width: `${value}%` }, styles.progress]} />
        </View>
      </View>
      {negativeIcon(!isPositive, sizes.large)}
    </View>
  );
};

const styles = StyleSheet.create({
  property: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7
  },

  barWrap: {
    width: 150,
    height: "100%",
    marginHorizontal: 10
  },
  barContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: colors.negativeColor,
    borderRadius: BORDER_RADIUS
  },
  progress: {
    backgroundColor: colors.positiveColor,
    height: "100%",
    position: "relative",
    borderRadius: BORDER_RADIUS
  }
});
