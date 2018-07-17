import React from "react";
import { View, StyleSheet } from "react-native";
import properties from "../settings/propertyConfig";
import colors, { sizes, BORDER_RADIUS } from "../settings/defaultStyles";
import AppText from "./AppText";
import { positiveIcon, negativeIcon } from "../settings/icons";

export default ({ reviewSummary }) => {
  console.log("DEBUG", reviewSummary);
  return (
    <View>
      {properties.map(property =>
        renderProperty(property, reviewSummary[propertyMap[property.name]])
      )}
    </View>
  );
};

const renderProperty = (property, propertyReviews) => {
  const { name, icon } = property;
  const { positive, negative } = propertyReviews;
  return (
    <View key={name} style={styles.property}>
      <AppText type="primary" size="medium" style={{ flex: 1 }}>
        {icon} {name}
      </AppText>

      {positive || negative ? (
        valueBar(positive, negative)
      ) : (
        <AppText type="primary" size="medium">
          Ingen vurderinger
        </AppText>
      )}
    </View>
  );
};

const valueBar = (positive, negative) => {
  const value = (positive / (positive + negative)) * 100;
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

const propertyMap = {
  Lydutjevning: "Lydutjevningvurderinger",
  Informasjon: "Informasjonvurderinger",
  Lydforhold: "Lydforholdvurderinger",
  Teleslynge: "Teleslyngevurderinger"
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
