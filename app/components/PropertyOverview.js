import React from "react";
import { View, StyleSheet, Text } from "react-native";
import properties from "../settings/propertyConfig";
import colors from "../settings/defaultStyles";
import AppText from "./AppText";
import PropertyReviewIcon from "./PropertyReviewIcon";
import PropertyTitle from "./PropertyTitle";
import SlimText from "./SlimText";

const FONT_SIZE = 20;
export default ({ reviewSummary }) => {
  return (
    <View>
      {properties.map(property =>
        renderProperty(property, reviewSummary[propertyMap[property.name]])
      )}
    </View>
  );
};

const renderProperty = (property, propertyReviews) => {
  let { positive, negative } = propertyReviews;

  return (
    <View key={property.name} style={styles.property}>
      <PropertyTitle property={property} size={FONT_SIZE} style={{ flex: 1 }} />
      {positive || negative ? (
        valueBar(positive, negative)
      ) : (
        <SlimText style={styles.noReviews}>Ingen vurderinger</SlimText>
      )}
    </View>
  );
};
//

const valueBar = (positive, negative) => {
  const positivePercentage = Math.round(
    (positive / (positive + negative)) * 100
  );
  const isPositive = positivePercentage >= 50;
  return (
    <View style={{ flexDirection: "row" }}>
      <PropertyReviewIcon
        positive={isPositive}
        size={FONT_SIZE}
        hidden={!isPositive}
      />
      <View style={styles.barWrap}>
        <View
          style={[
            styles.barContainer,
            { backgroundColor: isPositive ? "#FFFFFF" : colors.negativeColor }
          ]}
        >
          <Text
            style={[styles.barText, isPositive ? { left: 10 } : { right: 10 }]}
          >
            {`${isPositive ? positivePercentage : 100 - positivePercentage}%`}
          </Text>
          <View
            style={[
              {
                width: `${positivePercentage}%`,
                backgroundColor: isPositive ? colors.positiveColor : "#FFFFFF"
              },
              styles.progress
            ]}
          />
        </View>
      </View>
      <PropertyReviewIcon
        positive={isPositive}
        size={FONT_SIZE}
        hidden={isPositive}
      />
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
    paddingVertical: 9
  },

  barWrap: {
    width: 120,
    height: "85%",
    marginHorizontal: 10
  },
  barContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 10,
    overflow: "hidden"
  },
  progress: {
    height: "100%",
    position: "relative"
  },
  noReviews: {
    fontSize: FONT_SIZE,
    textAlign: "center",
    flex: 1
  },
  barText: {
    top: 0,
    bottom: 0,
    position: "absolute",
    zIndex: 1,
    fontSize: 15,
    color: colors.primaryTextColor
  }
});
