import React from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import colors from "../settings/defaultStyles";
import properties from "../settings/propertyConfig";
import PropTypes from "prop-types";

const CreateReviewNavigation = ({ currentProperty, onPropertySelect }) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.icons}>
          {properties.map((property, index) => {
            const isCurrent = currentProperty === property.name;
            return (
              <TouchableHighlight
                key={property.name}
                onPress={() => onPropertySelect(property.name)}
                style={[
                  styles.icon,
                  index !== 0 ? { marginLeft: 30 } : {},
                  isCurrent ? { backgroundColor: colors.primaryTextColor } : {}
                ]}
              >
                {React.cloneElement(property.icon, {
                  size: 25,
                  color: isCurrent
                    ? colors.primaryBackgroundColor
                    : colors.primaryTextColor
                })}
              </TouchableHighlight>
            );
          })}
        </View>

        <View style={styles.lineWrap}>
          <View style={styles.line} />
        </View>
      </View>
    </View>
  );
};

CreateReviewNavigation.propTypes = {
  currentProperty: PropTypes.string.isRequired,
  onPropertySelect: PropTypes.func.isRequired
};

export default CreateReviewNavigation;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  icons: {
    flexDirection: "row",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    zIndex: 1,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primaryTextColor,
    backgroundColor: colors.primaryBackgroundColor
  },
  lineWrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center"
  },
  line: {
    backgroundColor: colors.primaryTextColor,
    height: 1,
    position: "relative"
  }
});
