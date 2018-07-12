import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import colors, { COMPONENT_SPACING } from "../settings/defaultStyles";
import PropTypes from "prop-types";

const ViewContainer = ({
  children,
  heightAdjusting,
  style,
  opaque,
  padding,
  scrollable
}) => {
  const Component = scrollable ? ScrollView : View;
  return (
    <Component
      style={[
        opaque ? styles.opaque : null,
        styles[heightAdjusting],
        padding != undefined ? { padding: padding } : styles.padding,
        style
      ]}
    >
      {children}
    </Component>
  );
};

const styles = StyleSheet.create({
  opaque: {
    backgroundColor: colors.primaryBackgroundColor
  },
  flex: {
    flex: 1
  },
  auto: {
    width: "100%",
    height: "auto"
  },
  padding: {
    padding: COMPONENT_SPACING
  }
});

ViewContainer.propTypes = {
  heightAdjusting: PropTypes.oneOf(["flex", "auto"]).isRequired,
  style: PropTypes.object,
  opaque: PropTypes.bool,
  scrollable: PropTypes.bool,
  padding: PropTypes.number
};

export default ViewContainer;
